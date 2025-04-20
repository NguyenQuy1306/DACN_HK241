# model/train_model.py
import os
import pandas as pd
import sys
# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..','..')))
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score, classification_report
from app.config.config import MODEL_PATH
import logging

def train_and_save_model(df: pd.DataFrame):
    # 1. Parse datetime safely
    def safe_parse_datetime(series, column_name):
        try:
            return pd.to_datetime(series, format="%Y-%m-%d %H:%M:%S", errors="coerce")
        except Exception as e:
            print(f"[!] Error parsing {column_name}: {e}")
            return pd.to_datetime(series, errors="coerce")

    df["booking_time"] = pd.to_datetime(df["booking_time"], errors="coerce")
    df["reservation_datetime"] = pd.to_datetime(df["reservation_date"] + " " + df["reservation_time"], errors="coerce")

    logging.info(f"[DEBUG] Rows before dropna: {len(df)}")
    df.dropna(subset=["booking_time", "reservation_datetime"], inplace=True)
    logging.info(f"[DEBUG] Rows after dropna: {len(df)}")

    df["booking_time"] = df["booking_time"].dt.tz_localize(None)


    # 2. Feature engineering
    try:
        logging.info("Sample row:\n%s", df.iloc[0].to_string())
        logging.info("Dtypes before feature engineering:\n%s", df.dtypes.to_string())

        logging.info("➡ Creating 'booking_hour'")
        df["booking_hour"] = df["booking_time"].dt.hour

        logging.info("➡ Creating 'reservation_hour'")
        df["reservation_hour"] = df["reservation_datetime"].dt.hour  

        logging.info("➡ Creating 'advance_minutes'")
        df["advance_minutes"] = (df["reservation_datetime"] - df["booking_time"]).dt.total_seconds() / 60

        logging.info("➡ Creating 'day_of_week'")
        df["day_of_week"] = df["reservation_datetime"].dt.weekday

        logging.info("➡ Creating 'is_weekend'")
        df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

        logging.info("✅ Feature engineering completed successfully")

    except Exception as e:
        logging.error("❌ Error during feature engineering: %s", str(e))
        logging.error("Data types:\n%s", df.dtypes.to_string())
        logging.error("Sample row on error:\n%s", df.iloc[0].to_string())


    # 3. Features & label
    FEATURES = [
        "user_id", "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week", "is_weekend",
         "avg_user_cancel_rate","payment_status","user_distance_km"
    ]
    TARGET = "is_arrival"

    X = df[FEATURES]
    y = df[TARGET]
    logging.info("One row of features (X):\n%s", X.iloc[0].to_string())

    # 4. Train/test split
    logging.info("Train/test split")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 5. Preprocessing
    logging.info("Preprocessing")
    numeric_features = [
        "booking_hour", "reservation_hour", "advance_minutes",
        "num_guests", "is_first_booking", "day_of_week",
        "is_weekend", "avg_user_cancel_rate","user_distance_km"
    ]

    categorical_features = ["user_id","payment_status"]

    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown="ignore", sparse_output=False)

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features)
        ]
    )

    # 6. Pipeline
    logging.info("Pipeline")
    pipeline = Pipeline([
        ("prep", preprocessor),
        ("clf", RandomForestClassifier(n_estimators=200, random_state=42, class_weight="balanced"))
    ])

    # 7. Grid Search
    logging.info("Grid Search")
    param_grid = {
        "clf__max_depth": [5, 10, None],
        "clf__min_samples_split": [2, 5, 10],
    }
    grid = GridSearchCV(pipeline, param_grid, cv=3, scoring="roc_auc", n_jobs=-1)
    grid.fit(X_train, y_train)

    # 8. Evaluate
    logging.info("Evaluate")
    best_model = grid.best_estimator_
    y_pred_proba = best_model.predict_proba(X_test)[:, 1]
    print("ROC AUC:", roc_auc_score(y_test, y_pred_proba))
    print(classification_report(y_test, best_model.predict(X_test)))

    # 9. Save model
    logging.info("Save model")
    logging.info("Save model")
    print(f"[DEBUG] Current working directory: {os.getcwd()}")
    print(f"[DEBUG] Saving model to: {MODEL_PATH}")

    try:
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
        joblib.dump(best_model, MODEL_PATH, compress=3)
        logging.info(f"[✔] Model saved to {MODEL_PATH}")
    except Exception as e:
        logging.error(f"❌ Failed to save model: {e}")
        print(f"[✘] Failed to save model: {e}")
