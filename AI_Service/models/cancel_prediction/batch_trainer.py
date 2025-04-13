# model/batch_trainer.py

import psycopg2
import pandas as pd
from config.config import MODEL_PATH
from models.cancel_prediction.train_model import train_and_save_model  
import joblib

POSTGRES_CONFIG = {
    "host": "localhost",
    "database": "curcus",
    "user": "postgres",
    "password": "Ngocquynguyen1",
    "port": 5432
}

def get_latest_bookings(limit=500):
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    query = """
        SELECT * FROM datban
        ORDER BY booking_time DESC
        LIMIT %s
    """
    df = pd.read_sql_query(query, conn, params=(limit,))
    conn.close()
    return df

def retrain_if_enough_data(batch_size=10):
    df = get_latest_bookings(limit=batch_size)
    if len(df) >= batch_size:
        print(f"[🧠] Enough data ({len(df)}). Retraining model...")
        train_and_save_model(df)
        print(f"[✅] Model retrained and saved to {MODEL_PATH}")
    else:
        print(f"[⏳] Not enough data to retrain (have {len(df)} / {batch_size})")
