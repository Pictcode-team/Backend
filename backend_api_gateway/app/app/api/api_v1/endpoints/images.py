from typing import Any
from uuid import UUID
from fastapi import (
    APIRouter,
    Response,
    Path,
)
from fastapi.param_functions import Depends

from app.schemas.images import ImageUploadResponse, ImagesUrlsResponse
from app.api.deps import SenderImages, ReceiveImages

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


@router.get("/{uuid}", response_model=ImagesUrlsResponse)
async def download_images(
    uuid: UUID = Path(..., title="The UUID of the workspace to consult the images."),
    receiver:  ReceiveImages = Depends(ReceiveImages)
) -> Any:
    images = ImagesUrlsResponse(
        images=["https://pydantic-docs.helpmanual.io/usage/types/#urls"]
    )
    return images
