# model/train_model.py
import os
import pandas as pd
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..','..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score, classification_report
from config.config import MODEL_PATH
import logging


def train_and_evaluate_models(df: pd.DataFrame):
    # Parse datetime and feature engineering
    df["booking_time"] = pd.to_datetime(df["booking_time"], errors="coerce")
    df["reservation_datetime"] = pd.to_datetime(df["reservation_date"] + " " + df["reservation_time"], errors="coerce")
    df.dropna(subset=["booking_time", "reservation_datetime"], inplace=True)
    df["booking_time"] = df["booking_time"].dt.tz_localize(None)
    df["booking_hour"] = df["booking_time"].dt.hour
    df["reservation_hour"] = df["reservation_datetime"].dt.hour
    df["advance_minutes"] = (df["reservation_datetime"] - df["booking_time"]).dt.total_seconds() / 60
    df["day_of_week"] = df["reservation_datetime"].dt.weekday
    df["is_weekend"] = df["day_of_week"].isin([5,6]).astype(int)

    FEATURES = [
        "user_id", "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week", "is_weekend",
        "avg_user_cancel_rate", "payment_status", "user_distance_km"
    ]
    TARGET = "is_arrival"

    X = df[FEATURES]
    y = df[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Preprocessor
    numeric_features = [
        "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week", "is_weekend",
        "avg_user_cancel_rate", "user_distance_km"
    ]
    categorical_features = ["user_id", "payment_status"]
    preprocessor = ColumnTransformer([
        ("num", StandardScaler(), numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features)
    ])

    # Define models
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Decision Tree": DecisionTreeClassifier(random_state=42),
        "Support Vector Machine": SVC(probability=True, random_state=42),
        "K-Nearest Neighbors": KNeighborsClassifier(),
        "Gradient Boosting": GradientBoostingClassifier(random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=200, random_state=42)
    }

    results = {}
    for name, clf in models.items():
        pipe = Pipeline([
            ("prep", preprocessor),
            ("clf", clf)
        ])
        pipe.fit(X_train, y_train)
        y_prob = pipe.predict_proba(X_test)[:,1]
        y_pred = pipe.predict(X_test)
        auc = roc_auc_score(y_test, y_prob)
        report = classification_report(y_test, y_pred)
        print(f"=== {name} ===")
        print(f"ROC AUC: {auc:.4f}")
        print(report)
        results[name] = auc

    # Select best
    best_name = max(results, key=results.get)
    print(f"Best model by ROC AUC: {best_name} ({results[best_name]:.4f})")

    # Retrain best on full data and save
    best_clf = models[best_name]
    final_pipe = Pipeline([
        ("prep", preprocessor),
        ("clf", best_clf)
    ])
    final_pipe.fit(X, y)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(final_pipe, MODEL_PATH, compress=3)
    logging.info(f"Saved best model '{best_name}' to {MODEL_PATH}")


if __name__ == "__main__":
    df = pd.read_csv(
        r'C:\Users\LENOVO\Desktop\src_DACN\DACN_HK241\BE\AI_Service\data\sample_reservation_data.csv'
    )
    train_and_evaluate_models(df)
