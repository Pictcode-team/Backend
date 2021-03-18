from uuid import UUID
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, AnyHttpUrl


class ImageUploadResponse(BaseModel):
    uuid: str
    created_date: datetime = datetime.now()
    images: List[str]


class ImagesUrlsResponse(BaseModel):
    images: List[AnyHttpUrl]
