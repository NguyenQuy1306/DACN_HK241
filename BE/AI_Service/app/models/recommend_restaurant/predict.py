import pickle
from tenacity import retry, wait_fixed, stop_after_attempt, retry_if_exception_type

import pandas as pd
import requests
  # Đặt file CSV ở gốc hoặc config sau
@retry(
    wait=wait_fixed(5),
    stop=stop_after_attempt(15),
    retry=retry_if_exception_type((requests.exceptions.RequestException,))
)
def get_restaurants_df():
    url = "http://spring:8080/api/restaurants/all"  # Thay bằng URL thật
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return pd.DataFrame(data["payload"])
    else:
        raise Exception(f"Failed to fetch restaurants. Status code: {response.status_code}")
    
restaurants_df = get_restaurants_df()


def load_model():
    with open("app/models/recommend_restaurant/model.pkl", "rb") as f:
        return pickle.load(f)

def predict_top_n(user_features, top_n=5):
    model = load_model()
    results = []

    for _, row in restaurants_df.iterrows():
        prob = model.predict_proba_one(user_features)
        score = prob.get(True, 0.0)
        results.append((row["maSoNhaHang"], score))

    # Sắp xếp và lấy top N
    sorted_results = sorted(results, key=lambda x: x[1], reverse=True)
    return [int(r[0]) for r in sorted_results[:top_n]]