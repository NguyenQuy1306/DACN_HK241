import pandas as pd
import logging
import re
def camel_to_snake(data):
    return {
        re.sub(r'(?<!^)(?=[A-Z])', '_', k).lower(): v for k, v in data.items()
    }
def enrich_booking_data(data):
    logging.info("checkking123")

    booking_time = pd.to_datetime(data["booking_time"])
    logging.info("checkking1234")

    reservation_datetime = pd.to_datetime(data["reservation_date"] + " " + data["reservation_time"])
    logging.info("checkking1235")
    return {
        "user_id": data["user_id"],
        "booking_hour": booking_time.hour,
        "reservation_hour": reservation_datetime.hour,
        "advance_minutes": (reservation_datetime - booking_time).total_seconds() / 60,
        "num_guests": data["num_guests"],
        "is_first_booking": int(data["is_first_booking"]),
        "day_of_week": reservation_datetime.weekday(),
        "is_weekend": int(reservation_datetime.weekday() in [5, 6]),
        "avg_user_cancel_rate": data["avg_user_cancel_rate"],
        "user_distance_km": data["user_distance_km"],
        "payment_status":data["payment_status"],
        "total_cancel_bookings":data["total_cancel_bookings"],
        "total_bookings":data["total_bookings"]
    }
