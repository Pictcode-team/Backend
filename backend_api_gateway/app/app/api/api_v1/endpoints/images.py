from typing import Any

from fastapi import (
    APIRouter,
    Response
)
from fastapi.param_functions import Depends

from app.schemas.images import ImageUploadResponse
from app.api.deps import SenderImages

router = APIRouter()


@router.post("/", response_model=ImageUploadResponse)
async def upload_images(
    # images: List[UploadFile] = File(...),
    response: Response,
    images: SenderImages = Depends(SenderImages),
) -> Any:
    response_upload = images.response_upload
    response.status_code = response_upload[0]
    image_upload_response = ImageUploadResponse(
        images=images.images_names,
        **response_upload[1],
    )
    return image_upload_response
