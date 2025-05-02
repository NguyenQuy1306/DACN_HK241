from kafka import KafkaConsumer
import pickle
import json
from river import linear_model, preprocessing
from app.config.config import BROKER_URL, USER_BEHAVIOR_TOPIC

# Load model hoặc khởi tạo mới nếu chưa có
try:
    with open("./app/models/recommend_restaurant/model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Loaded existing model")
except FileNotFoundError:
    model = preprocessing.StandardScaler() | linear_model.LogisticRegression()
    print("🆕 Initialized new model")

# Kết nối Kafka
consumer = KafkaConsumer(
    USER_BEHAVIOR_TOPIC,
    bootstrap_servers=BROKER_URL,
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='ai-worker-group'
)

print(f"👂 Listening to Kafka topic: {USER_BEHAVIOR_TOPIC}")

for message in consumer:
    try:
        event = message.value

        X = {
            "time_spent": event.get("timeSpent", 0),
            "liked": int(event.get("liked", False)),
            # Bạn có thể thêm feature như "clicked", "device", etc.
        }
        y = int(event.get("clicked", 1))  # mặc định là đã click

        # Dự đoán trước khi học (nếu cần)
        pred = model.predict_one(X)

        # Học từ hành vi mới
        model = model.learn_one(X, y)

        print(f"🧠 Learned: X={X}, y={y}, pred={pred}")

        # Lưu lại model
        with open("./app/models/recommend_restaurant/model.pkl", "wb") as f:
            pickle.dump(model, f)

    except Exception as e:
        print("❌ Error:", e)
