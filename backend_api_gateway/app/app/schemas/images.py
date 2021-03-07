from uuid import UUID
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

class ImageUploadResponse(BaseModel):
    uuid: str
    created_date: datetime = datetime.now()
    images: List[str]