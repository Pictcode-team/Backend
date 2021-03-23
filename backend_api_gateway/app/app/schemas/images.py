from uuid import UUID
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, AnyHttpUrl


class ImageUploadResponse(BaseModel):
    uuid: UUID
    created_date: datetime = datetime.now()
    # images: List[str]


class ImagesExpiredDateDownload(BaseModel):
    message: str


class ImagesUrl(BaseModel):
    url: AnyHttpUrl


class ImagesUrlsResponse(BaseModel):
    images: List[ImagesUrl]
    workspacename: Optional[str]
    identifier: UUID
