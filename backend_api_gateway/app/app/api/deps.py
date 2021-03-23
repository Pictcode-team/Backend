
import requests
from uuid import UUID
from typing import Generator, List, Dict, Tuple
from fastapi import Depends, HTTPException, status, UploadFile, File

from app.core.config import settings


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


class ReceiveImages:
    def __init__(self):
        self.url: str = settings.WORKSPACE_SERVICE_DNS

    def download_images(self, uuid: UUID):
        url = f'{self.url}/{str(uuid)}'
        response = requests.get(url)
        return (response.status_code, response.json())
