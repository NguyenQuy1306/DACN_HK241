from kafka_config import get_producer
import time

producer = get_producer()

sample_booking = {
    "user_id": "user_123",
    "booking_time": "2025-04-11T14:00:00",
    "reservation_time": "2025-04-11T19:00:00",
    "num_guests": 4,
    "is_first_booking": 0,

    "avg_user_cancel_rate": 0.2
}

producer.send("cancel_prediction", sample_booking)
producer.flush()
print("[Kafka] Booking sent")