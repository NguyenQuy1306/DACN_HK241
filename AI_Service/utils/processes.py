def enrich_booking_data(booking: dict):
    from datetime import datetime
    booking_time = datetime.fromisoformat(booking["booking_time"])
    reservation_time = datetime.fromisoformat(booking["reservation_time"])

    booking["booking_hour"] = booking_time.hour
    booking["reservation_hour"] = reservation_time.hour
    booking["advance_minutes"] = (reservation_time - booking_time).total_seconds() / 60
    booking["day_of_week"] = reservation_time.weekday()
    booking["is_weekend"] = int(booking["day_of_week"] in [5, 6])
    return booking