
import joblib
import os
import pandas as pd
# import sys
import logging
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..','..')))
from app.config.config import MODEL_PATH
# MODEL_PATH_FINAL = os.path.join(os.path.dirname(__file__), MODEL_PATH)

def predict_cancel_probability(enriched_booking_data):
    model = joblib.load(MODEL_PATH)
    # Dự đoán xác suất hủy
    if isinstance(enriched_booking_data, dict):
        enriched_booking_data = pd.DataFrame([enriched_booking_data])
    logging.info("[Kafka] After enrich")
    prob = model.predict_proba(enriched_booking_data)[:, 1]
    logging.info("[Kafka AI Service] Cancel probability: %.2f", float(prob))
    return prob
