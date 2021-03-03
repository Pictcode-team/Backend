from typing import List
import uuid
from datetime import datetime

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)
from fastapi.encoders import jsonable_encoder

from app.schemas.images import ImageUploadResponse

router = APIRouter()

@router.post("/images", response_model=ImageUploadResponse)
async def upload_images(images: List[UploadFile] = File(...)) -> ImageUploadResponse:
    uuid_workspace = uuid.uuid4()
    created_date = datetime.now()
    image_upload_response = ImageUploadResponse(
        id=uuid_workspace, 
        created_date=created_date
        )
    return image_upload_response