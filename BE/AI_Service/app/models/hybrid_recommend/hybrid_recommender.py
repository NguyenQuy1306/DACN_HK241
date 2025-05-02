from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load CSV dữ liệu
users_df = pd.read_csv('users.csv')
restaurants_df = pd.read_csv('data/restaurants.csv')
ratings_df = pd.read_csv('ratings.csv')

# Tiền xử lý như cũ
restaurants_df['combined_text'] = (
    restaurants_df['Name'].astype(str) + " " +
    restaurants_df['Style'].fillna('').astype(str) + " " +
    restaurants_df['Address'].fillna('').astype(str)
)

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(restaurants_df['combined_text'])
cbf_similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

user_ids = ratings_df['ID'].unique()
restaurant_ids = restaurants_df['ID'].unique()  # Cập nhật nếu bạn dùng 'ID'

user_index = {user_id: idx for idx, user_id in enumerate(user_ids)}
restaurant_index = {res_id: idx for idx, res_id in enumerate(restaurant_ids)}

cf_matrix = np.zeros((len(user_ids), len(restaurant_ids)))
for _, row in ratings_df.iterrows():
    u = user_index[row['ID']]
    r = restaurant_index.get(row['Restaurant_id'])
    if r is not None:
        cf_matrix[u][r] = row['Rate']

cf_similarity_matrix = cosine_similarity(cf_matrix.T)

# Hàm đề xuất
def get_hybrid_scores(user_id, top_n=10, alpha=0.5):
    if user_id not in user_index:
        return []

    user_idx = user_index[user_id]
    user_ratings = cf_matrix[user_idx]
    rated_indices = np.where(user_ratings > 0)[0]

    if len(rated_indices) == 0:
        mean_similarity = cbf_similarity_matrix.mean(axis=0)
        top_indices = mean_similarity.argsort()[::-1][:top_n]
        return [int(restaurant_ids[i]) for i in top_indices]

    cbf_score = cbf_similarity_matrix[rated_indices].mean(axis=0)
    cf_score_full = np.zeros_like(cbf_score)
    for idx in rated_indices:
        cf_score_full += cf_similarity_matrix[idx]
    cf_score_full /= len(rated_indices)

    hybrid_score = alpha * cbf_score + (1 - alpha) * cf_score_full
    unrated_indices = [i for i in range(len(restaurant_ids)) if i not in rated_indices]
    sorted_indices = sorted(unrated_indices, key=lambda i: hybrid_score[i], reverse=True)
    top_indices = sorted_indices[:top_n]
    return [int(restaurant_ids[i]) for i in top_indices]

# Tạo route REST API
@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = int(request.args.get('user_id', 1))
    top_n = int(request.args.get('top_n', 5))
    alpha = float(request.args.get('alpha', 0.6))

    recommendations = get_hybrid_scores(user_id, top_n=top_n, alpha=alpha)
    return jsonify({'user_id': user_id, 'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
