from pydantic import BaseModel

class RecommendRequest(BaseModel):
    user_id: int
    top_n: int = 5
