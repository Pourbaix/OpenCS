from typing import Union

from pydantic import BaseModel

class UserBase(BaseModel):
    steam_id: int

class InitUser(UserBase):
    match_tracking_code: Union[str, None] = None
    role: int = 0


class MatchBase(BaseModel):
    sharecode: str
    match_info: Union[str, dict] = None
    demo_url: str = None