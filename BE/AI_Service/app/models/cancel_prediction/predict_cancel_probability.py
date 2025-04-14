
import joblib
import os
import pandas as pd
import sys
# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..','..')))
from config.config import MODEL_PATH
MODEL_PATH_FINAL = os.path.join(os.path.dirname(__file__), MODEL_PATH)

def predict_cancel_probability(enriched_booking_data):
    # Tải mô hình đã huấn luyện
    print("checkking1234xcxsssscxxxcx")
    model = joblib.load(MODEL_PATH_FINAL)
    print("chcxcxc") 
    # Dự đoán xác suất hủy
    if isinstance(enriched_booking_data, dict):
        enriched_booking_data = pd.DataFrame([enriched_booking_data])
    print("enriched_booking_data ",enriched_booking_data) 
    prob = model.predict_proba(enriched_booking_data)[:, 1]
    print("chcxcxcxxxxx",prob) 
    return prob
