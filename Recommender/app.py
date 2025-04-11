from flask import Flask, request, jsonify
import pandas as pd
import pickle
from river import linear_model, preprocessing

app = Flask(__name__)

# Load dữ liệu nhà hàng
restaurants_df = pd.read_csv('restaurants.csv')

# Load model được học online
def load_model():
    with open("online_model.pkl", "rb") as f:
        return pickle.load(f)

# Hàm gợi ý dựa trên hành vi
def recommend_from_behavior(user_id, top_n=5):
    model = load_model()

    # Ở đây bạn có thể lấy hành vi gần nhất từ Redis hoặc DB, demo hardcode input
    # Giả sử ta test với behavior time_spent = 30, liked = 0
    base_behavior = {
        "time_spent": 30,
        "liked": 0
    }

    results = []
    for _, row in restaurants_df.iterrows():
        pred = model.predict_proba_one(base_behavior)
        results.append((row['ID'], pred))

    # Sắp xếp theo xác suất 'liked' = 1
    sorted_results = sorted(results, key=lambda x: x[1].get(1, 0.0), reverse=True)
    top_ids = [int(res[0]) for res in sorted_results[:top_n]]


    return top_ids

@app.route('/recommend/online', methods=['GET'])
def recommend_online():
    user_id = int(request.args.get('user_id', 1))
    top_n = int(request.args.get('top_n', 5))

    recommendations = recommend_from_behavior(user_id, top_n=top_n)
    return jsonify({'user_id': user_id, 'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
