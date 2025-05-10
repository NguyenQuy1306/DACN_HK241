import os
import pandas as pd
import joblib
import logging
import sys

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.over_sampling import RandomOverSampler

# Import config
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from config.config import MODEL_PATH

def retrain_model(df: pd.DataFrame):
    # 1. Parse datetime
    df["booking_time"] = pd.to_datetime(df["booking_time"], errors="coerce")
    df["reservation_datetime"] = pd.to_datetime(df["reservation_date"] + " " + df["reservation_time"], errors="coerce")
    df.dropna(subset=["booking_time", "reservation_datetime"], inplace=True)
    df["booking_time"] = df["booking_time"].dt.tz_localize(None)

    # 2. Feature engineering
    df["booking_hour"] = df["booking_time"].dt.hour
    df["reservation_hour"] = df["reservation_datetime"].dt.hour
    df["advance_minutes"] = (df["reservation_datetime"] - df["booking_time"]).dt.total_seconds() / 60
    df["day_of_week"] = df["reservation_datetime"].dt.weekday
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

    FEATURES = [
        "user_id", "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week", "is_weekend",
        "avg_user_cancel_rate", "payment_status", "user_distance_km"
    ]
    TARGET = "is_arrival"
    X = df[FEATURES]
    y = df[TARGET]

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Preprocessing
    numeric_features = [
        "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week",
        "is_weekend", "avg_user_cancel_rate", "user_distance_km"
    ]
    categorical_features = ["user_id", "payment_status"]
    preprocessor = ColumnTransformer([
        ("num", StandardScaler(), numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features)
    ])

    sampler = RandomOverSampler(random_state=42)

    # Reload mô hình nếu tồn tại
    if os.path.exists(MODEL_PATH):
        print(f"Loading existing model from {MODEL_PATH}")
        pipeline = joblib.load(MODEL_PATH)
    else:
        print("No existing model found. Creating new one.")
        pipeline = ImbPipeline([
            ("prep", preprocessor),
            ("sampler", sampler),
            ("clf", RandomForestClassifier(
                n_estimators=200,
                random_state=2025,
                class_weight="balanced",
                n_jobs=-1
            ))
        ])

    # Retrain
    pipeline.fit(X_train, y_train)

    # Save model
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH, compress=3)
    logging.info(f"Model retrained and saved to {MODEL_PATH}")
