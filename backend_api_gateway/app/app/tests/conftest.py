from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient

from app.core.config import settings
from app.main import app
