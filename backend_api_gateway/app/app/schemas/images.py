from uuid import UUID
from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class ImageUploadResponse(BaseModel):
    id: UUID
    created_date: datetime