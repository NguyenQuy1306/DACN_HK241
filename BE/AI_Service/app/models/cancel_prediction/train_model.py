# model/train_model.py
import os
import pandas as pd
import sys
# Thêm đường dẫn cha để import
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..','..')))
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

import joblib
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
# imbalanced-learn cho sampling
from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.over_sampling import RandomOverSampler
from imblearn.under_sampling import RandomUnderSampler
from sklearn.metrics import roc_auc_score, classification_report
from app.config.config import MODEL_PATH
import logging


def train_and_save_model(df: pd.DataFrame):
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

    # 3. Đặc trưng và nhãn
    FEATURES = [
        "user_id", "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week", "is_weekend",
        "avg_user_cancel_rate", "payment_status", "user_distance_km"
    ]
    TARGET = "is_arrival"
    X = df[FEATURES]
    y = df[TARGET]

    # 4. Chia train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 5. Tiền xử lý
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

    # 6. Sampling
    # Chọn oversampling hoặc undersampling
    sampler = RandomOverSampler(random_state=42)
    # sampler = RandomUnderSampler(random_state=42)

    # 7. Pipeline với XGBoost
    pipeline = ImbPipeline([
        ("prep", preprocessor),
        ("sampler", sampler),
        ("clf", XGBClassifier(
            objective='binary:logistic',
            use_label_encoder=False,
            eval_metric='auc',
            random_state=2025,
            n_jobs=-1
        ))
    ])

    # 8. Randomized Search
    param_dist = {
        'clf__n_estimators': [100, 200, 500],
        'clf__max_depth': [3, 5, 7],
        'clf__learning_rate': [0.01, 0.05, 0.1],
        'clf__subsample': [0.6, 0.8, 1.0],
        'clf__colsample_bytree': [0.6, 0.8, 1.0]
    }
    search = RandomizedSearchCV(
        pipeline,
        param_distributions=param_dist,
        n_iter=20,
        scoring='roc_auc',
        cv=3,
        random_state=42,
        n_jobs=-1
    )
    search.fit(X_train, y_train)

    # 9. Đánh giá
    best_model = search.best_estimator_
    y_pred_proba = best_model.predict_proba(X_test)[:, 1]
    print("Best params:", search.best_params_)
    print("ROC AUC:", roc_auc_score(y_test, y_pred_proba))
    print(classification_report(y_test, best_model.predict(X_test)))

    # 10. Lưu mô hình
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(best_model, MODEL_PATH, compress=3)
    logging.info(f"Model saved to {MODEL_PATH}")


if __name__ == "__main__":
    df = pd.read_csv(
        r'C:\Users\LENOVO\Desktop\src_DACN\DACN_HK241\BE\AI_Service\data\sample_reservation_data.csv'
    )
    train_and_save_model(df)
