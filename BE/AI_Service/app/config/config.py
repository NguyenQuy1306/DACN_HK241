import os

BROKER_URL = os.getenv("BROKER_URL", "kafka:9092")
CANCEL_TOPIC = os.getenv("CANCEL_TOPIC", "predict-request-events")
TRAINING_TOPIC = os.getenv("TRAINING_TOPIC", "training-request-events")
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")  
MODEL_PATH = os.getenv("MODEL_PATH", "app/models/cancel_prediction/cancel_predictor.joblib")
CANCEL_RESULT_TOPIC = os.getenv("CANCEL_RESULT_TOPIC", "cancel-result-topic")
USER_BEHAVIOR_TOPIC = os.getenv("USER_BEHAVIOR_TOPIC", "user-behavior-topic")