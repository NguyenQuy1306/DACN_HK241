# worker.py

import pickle
import json
import redis
from river import linear_model, preprocessing

# Kết nối Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Load model nếu có, hoặc khởi tạo model mới
try:
    with open("online_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Loaded existing model")
except FileNotFoundError:
    model = preprocessing.StandardScaler() | linear_model.LogisticRegression()
    print("🆕 Initialized new model")

# Lắng nghe channel Redis
pubsub = r.pubsub()
pubsub.subscribe('user_behavior')

print("👂 Listening for user behavior...")

for message in pubsub.listen():
    if message['type'] != 'message':
        continue

    try:
        # Parse dữ liệu hành vi
        event = json.loads(message['data'])

        # Giả sử sự kiện có dạng:
        # { "user_id": "u123", "restaurant_id": "r456", "time_spent": 35, "liked": 1, "clicked": 1 }
        X = {
            "time_spent": event.get("time_spent", 0),
            "liked": event.get("liked", 0),
            # Có thể thêm các đặc trưng khác tại đây
        }
        y = event.get("clicked", 0)

        # Dự đoán trước khi học (tuỳ chọn)
        pred = model.predict_one(X)

        # Học từ hành vi mới
        model = model.learn_one(X, y)

        # Ghi log
        print(f"🧠 Learned: X={X}, y={y}, pred={pred}")

        # Lưu model lại
        with open("online_model.pkl", "wb") as f:
            pickle.dump(model, f)

    except Exception as e:
        print("❌ Error:", e)
