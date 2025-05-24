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
        booking_hour = booking_time.hour
        reservation_hour = reservation_datetime.hour
        advance_minutes = (reservation_datetime - booking_time).total_seconds() / 60
        num_guests = random.randint(1, 6)
        is_first = random.randint(0, 1)
        payment = random.choice(["COMPLETED", "CANCELLED_REFUNDED","PAID_PENDING_USE"])
        distance = round(random.uniform(0.1, 30.0), 2)
        is_weekend = 1 if reservation_datetime.weekday() in [5, 6] else 0
        # Lịch sử người dùng
        total_cancel_bookings = random.randint(0, 10)
        total_bookings = random.randint(1, 20)
        avg_user_cancel_rate = total_cancel_bookings / total_bookings if total_bookings > 0 else 0

        # Bias 1: Dựa trên lịch sử người đặt
        user_history_bias = (
            -3 * avg_user_cancel_rate
            + 3 * ((total_bookings-total_cancel_bookings) / total_bookings)     # Có nhiều lần đặt → tăng likelihood đến
            - 0.3 * is_first                  # Lần đầu đặt → dễ huỷ/no-show hơn
        )

        # Bias 2: Dựa trên yếu tố bên ngoài
        external_factors_bias = (
            + 0.001 * advance_minutes         # Giảm ảnh hưởng advance_minutes
            + 0.3 * (num_guests / 6)
            + (2 if payment == "PAID_PENDING_USE" else (-0.5 if payment == "CANCELLED_REFUNDED" else 1))
            + (2 if reservation_hour in range(12, 15) or reservation_hour in range(18, 21) else -0.2)
            + (0.4 if distance <= 10 else -0.8)
            + (4 if is_weekend==1  else -0.2)

        )

        # Thành phần nhiễu nhẹ để tăng tính ngẫu nhiên
        noise = np.random.normal(0, 0.2)

        # Tính xác suất đến
        score = user_history_bias + external_factors_bias + noise
        p_arrival = sigmoid(score - 0.5)  # shift để mean khoảng 0.5

        is_arrival = np.random.rand() < p_arrival

        data.append({
            "user_id": f"user_{random.randint(1, 100)}",
            "booking_time": booking_time,
            "total_cancel_bookings": total_cancel_bookings,
            "total_bookings": total_bookings,
            "reservation_date": reservation_datetime.strftime("%Y-%m-%d"),
            "reservation_time": reservation_datetime.strftime("%H:%M:%S"),
            "num_guests": num_guests,
            "is_first_booking": is_first,
            "avg_user_cancel_rate": avg_user_cancel_rate,
            "payment_status": payment,
            "user_distance_km": distance,
            "advance_minutes": advance_minutes,
            "booking_hour": booking_hour,
            "reservation_hour": reservation_hour,
            "is_weekend": 1 if reservation_datetime.weekday() in [5, 6] else 0,
            "is_arrival": int(is_arrival)
        })

    return pd.DataFrame(data)

# Tạo dữ liệu
df = generate_biased_data(5000)
print(f"Tỷ lệ đến trung bình: {df.is_arrival.mean():.2f}")

# Lưu ra file
df.to_csv("C:\\Users\\LENOVO\\Desktop\\src_DACN\\DACN_HK241\\BE\\AI_Service\\data\\sample_reservation_data.csv", index=False)
