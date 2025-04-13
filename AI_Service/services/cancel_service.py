
from utils.processes import enrich_booking_data
# from can
import pandas as pd

class CancelPredictionService:
    def __init__(self):
        self.model = load_model()
        self.features = [
            "user_id", "booking_hour", "reservation_hour", "advance_minutes",
            "num_guests", "is_first_booking", "day_of_week", "is_weekend",
            "weather_forecast", "booking_channel", "has_discount_code", "avg_user_cancel_rate"
        ]

    def predict(self, booking_dict: dict) -> float:
        enriched = enrich_booking_data(booking_dict)
        df = pd.DataFrame([enriched])
        return self.model.predict_proba(df)[0, 1]
