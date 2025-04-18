import pickle
import pandas as pd

restaurants_df = pd.read_csv('restaurants.csv')  # Đặt file CSV ở gốc hoặc config sau

def load_model():
    with open("app/models/recommend_restaurant/model.pkl", "rb") as f:
        return pickle.load(f)

def predict_top_n(user_features, top_n=5):
    model = load_model()
    results = []

    for _, row in restaurants_df.iterrows():
        prob = model.predict_proba_one(user_features)
        score = prob.get(True, 0.0)
        results.append((row["ID"], score))

    # Sắp xếp và lấy top N
    sorted_results = sorted(results, key=lambda x: x[1], reverse=True)
    return [int(r[0]) for r in sorted_results[:top_n]]
