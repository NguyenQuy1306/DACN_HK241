
from app.utils.processes import enrich_booking_data
from app.models.cancel_prediction.predict_cancel_probability import predict_cancel_probability
# from can
import pandas as pd

class CancelPredictionService:
    # def __init__(self):
    #     self.model = load_model()
    #     self.features = [
    #     "user_id", "booking_hour", "reservation_hour", "advance_minutes",
    #     "num_guests", "is_first_booking", "day_of_week", "is_weekend",
    #      "avg_user_cancel_rate","payment_status","user_distance_km"
    # ]

    def predict(self, booking_dict: dict) -> float:
        print("checkking1234xcxssssc")
        enriched = enrich_booking_data(booking_dict)
        print("checkking1234xcxssssc")
        prob = predict_cancel_probability(enriched)
        return prob
