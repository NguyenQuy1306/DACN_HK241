from app.models.recommend_restaurant.predict import predict_top_n

def recommend_for_user(user_id: int, top_n: int = 5):
    # Dữ liệu hành vi tạm hardcode, sau sẽ đọc từ Redis
    user_behavior = {
        "time_spent": 25,
        "liked": 0
    }
    return predict_top_n(user_behavior, top_n=top_n)
