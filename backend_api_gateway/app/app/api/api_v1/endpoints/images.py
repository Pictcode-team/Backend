from typing import List, Any
import uuid
from datetime import datetime

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)
from fastapi.encoders import jsonable_encoder
from fastapi.param_functions import Depends

from app.schemas.images import ImageUploadResponse
from app.api.deps import SenderImages

router = APIRouter()




@router.post("/", response_model=ImageUploadResponse)
async def upload_images(
    # images: List[UploadFile] = File(...), 
    images: SenderImages = Depends(SenderImages)
    ) -> Any:
    uuid_workspace = uuid.uuid4()
    created_date = datetime.now()
    image_upload_response = ImageUploadResponse(
        id=uuid_workspace, 
        created_date=created_date
        )
    return image_upload_response