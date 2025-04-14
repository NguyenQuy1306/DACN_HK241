import pandas as pd
from pymongo import MongoClient
from app.config.config import MODEL_PATH, MONGODB_URI
from app.models.cancel_prediction.train_model import train_and_save_model as actual_model_trainer
import logging
client = MongoClient(MONGODB_URI)
db = client["themeal"]
collection = db["order_prediction_log"]


def get_latest_bookings(limit=10):
    """
    Lấy các bản ghi đặt bàn mới nhất từ MongoDB để huấn luyện,
    chỉ lấy những bản ghi chưa được huấn luyện (used_in_training != True).
    """
    logging.info("Getting data...")
    query = {
        "$or": [
            {"used_in_training": {"$exists": False}},  # chưa có field này
            {"used_in_training": {"$ne": True}}        # có field nhưng không phải True
        ]
    }
    logging.info("(Getting data23...")
    cursor = collection.find(query).sort("booking_time", -1).limit(limit)
    logging.info("(Getting data45...")
    df = pd.DataFrame(list(cursor))
    logging.info("(Getting data67...")
    if "_id" in df.columns:
        df.drop(columns=["_id"], inplace=True)
    logging.info(f"Retrieved {len(df)} rows from MongoDB.")
    return df



def train_and_save_model(df):
    """
    Gọi hàm huấn luyện mô hình và ghi lại dữ liệu đã sử dụng.
    """
    # 🧠 Gọi huấn luyện mô hình (ví dụ dùng sklearn bên trong)
    actual_model_trainer(df)

    # 📦 Đánh dấu các bản ghi đã dùng để train
    used_for_training = df.to_dict(orient="records")
    for doc in used_for_training:
        doc["used_in_training"] = True
        collection.update_one(
            {"orderId": doc["orderId"]},
            {"$set": doc},
            upsert=True
        )


def retrain_if_enough_data(batch_size=10):
    """
    Kiểm tra nếu đủ dữ liệu thì huấn luyện lại mô hình.
    """
    df = get_latest_bookings(limit=batch_size)
    if len(df) >= batch_size:
        logging.info(f"[🧠] Enough data ({len(df)}). Retraining model...")
        train_and_save_model(df)
        logging.info(f"[✅] Model retrained and saved to {MODEL_PATH}")
    else:
        logging.info(f"[⏳] Not enough data to retrain (have {len(df)} / {batch_size})")
