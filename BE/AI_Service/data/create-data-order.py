import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def generate_biased_data(n=5000):
    data = []
    base_time = datetime.now()

    for _ in range(n):
        # Sinh booking & reservation times
        booking_time = base_time - timedelta(minutes=random.randint(10, 7200))
        reservation_datetime = booking_time + timedelta(minutes=random.randint(30, 1440))

        # Các feature
        booking_hour   = booking_time.hour
        reservation_hour = reservation_datetime.hour
        advance_minutes = (reservation_datetime - booking_time).total_seconds() / 60
        num_guests     = random.randint(1, 6)
        is_first       = random.randint(0, 1)
        cancel_rate    = round(random.uniform(0.0, 1.0), 2)
        payment        = random.choice(["paid", "pending", "failed"])
        distance       = round(random.uniform(0.1, 30.0), 2)

        # Tạo bias dựa trên kinh nghiệm:
        # - Đặt càng sớm (advance_minutes lớn) → khả năng đến cao hơn chút
        # - Đặt sát giờ → dễ no-show
        # - Payment pending/failed → giảm likelihood
        # - Nhiều khách → khả năng đến cao hơn
        # - Xa quá (>20km) → khả năng đến thấp hơn
        # - Giờ ăn (12–14h, 18–20h) → khả năng đến cao hơn
        score = (
            + 0.005 * advance_minutes
            + 0.3 * (num_guests / 6)
            - 0.4 * is_first
            - 0.5 * (distance / 30)
            + (0.5 if 12 <= booking_hour <= 14 or 18 <= booking_hour <= 20 else 0)
            + (0.3 if payment == "paid" else (-0.2 if payment == "failed" else -0.1))
        )
        p_arrival = sigmoid(score - 0.5)  # shift để base rate khoảng 0.5

        is_arrival = np.random.rand() < p_arrival

        data.append({
            "user_id":              f"user_{random.randint(1, 100)}",
            "booking_time":         booking_time,
            "reservation_date":     reservation_datetime.strftime("%Y-%m-%d"),
            "reservation_time":     reservation_datetime.strftime("%H:%M:%S"),
            "num_guests":           num_guests,
            "is_first_booking":     is_first,
            "avg_user_cancel_rate": cancel_rate,
            "payment_status":       payment,
            "user_distance_km":     distance,
            "advance_minutes":      advance_minutes,
            "booking_hour":         booking_hour,
            "reservation_hour":     reservation_hour,
            "is_weekend":           int(reservation_datetime.weekday() >= 5),
            "is_arrival":           int(is_arrival)
        })

    return pd.DataFrame(data)
df = generate_biased_data(5000)
print(df.is_arrival.mean())  # Tỉ lệ đến trung bình

# Lưu ra file nếu cần
df.to_csv("C:\\Users\\LENOVO\\Desktop\\src_DACN\\DACN_HK241\\BE\\AI_Service\\data\\sample_reservation_data.csv", index=False)
