from typing import Generator, List, Dict, Tuple

from fastapi import Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session
import requests

from app import crud, models, schemas
from app.core import security
from app.core.config import settings
from app.db.session import SessionLocal

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = crud.user.get(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_active(current_user):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user

class SenderImages:
    def __init__(
        self,
        images: List[UploadFile] = File(...),
    ) -> None:
        self.images = self._filter_files(images=images)

    def _filter_files(self, *, images: List[UploadFile]) -> List[UploadFile]:
        if len(images) > settings.MAX_IMAGES:
            raise HTTPException(
                status_code=400,
                detail=f"No puedes cargar mas imagenes de {settings.MAX_IMAGES} imagenes"
            )
        for image in images:
            if image.content_type not in settings.VALID_MIME_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Este archvio: {image.filename} posee un contenido invalido"
                )
        return images

    @property
    def images_names(self) -> List[str]:
        images_names = []
        for image in self.images:
            images_names.append(image.filename)
        return images_names
    
    @property
    def response_upload(self) -> Tuple[int, Dict[str, str]]:
        images_bytes = [
            ('images', 
                (
                    image.filename,
                    image.file.read(),
                    image.content_type
                ),
            ) for image in self.images
            ]
        request = requests.post(
            settings.WORKSPACE_SERVICE_DNS,
            files=images_bytes
        )
        return (request.status_code, request.json())
        