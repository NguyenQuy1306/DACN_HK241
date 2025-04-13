# model/train_model.py

import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score, classification_report
from config.config import MODEL_PATH

def train_and_save_model(df: pd.DataFrame):
    # 1. Feature engineering
    df["booking_time"] = pd.to_datetime(df["booking_time"])
    df["reservation_time"] = pd.to_datetime(df["reservation_time"])
    
    df["booking_hour"] = df["booking_time"].dt.hour
    df["reservation_hour"] = df["reservation_time"].dt.hour
    df["advance_minutes"] = (df["reservation_time"] - df["booking_time"]).dt.total_seconds() / 60
    df["day_of_week"] = df["reservation_time"].dt.weekday
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

    # 2. Features & label
    FEATURES = [
        "user_id", "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week", "is_weekend",
        "weather_forecast", "booking_channel", "has_discount_code", "avg_user_cancel_rate"
    ]
    TARGET = "is_cancelled"

    X = df[FEATURES]
    y = df[TARGET]

    # 3. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 4. Preprocessing
    numeric_features = [
        "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week",
        "is_weekend", "avg_user_cancel_rate"
    ]
    categorical_features = ["user_id", "weather_forecast", "booking_channel", "has_discount_code"]

    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown="ignore", sparse=False)

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features)
        ]
    )

    # 5. Pipeline
    pipeline = Pipeline([
        ("prep", preprocessor),
        ("clf", RandomForestClassifier(n_estimators=200, random_state=42, class_weight="balanced"))
    ])

    # 6. Grid Search
    param_grid = {
        "clf__max_depth": [5, 10, None],
        "clf__min_samples_split": [2, 5, 10],
    }
    grid = GridSearchCV(pipeline, param_grid, cv=3, scoring="roc_auc", n_jobs=-1)
    grid.fit(X_train, y_train)

    # 7. Evaluate
    best_model = grid.best_estimator_
    y_pred_proba = best_model.predict_proba(X_test)[:, 1]
    print("ROC AUC:", roc_auc_score(y_test, y_pred_proba))
    print(classification_report(y_test, best_model.predict(X_test)))

    # 8. Save model
    joblib.dump(best_model, MODEL_PATH)
    print(f"[✔] Model saved to {MODEL_PATH}")
