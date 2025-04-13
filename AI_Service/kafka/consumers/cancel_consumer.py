
from kafka_config import get_consumer
from model.cancel_predictor import predict_cancel_probability
from utils.preprocess import enrich_booking_data
from config import CANCEL_TOPIC

consumer = get_consumer(CANCEL_TOPIC)
print("[Kafka] Listening to", CANCEL_TOPIC)

for message in consumer:
    booking = message.value
    print("[Kafka] Received:", booking)
    enriched = enrich_booking_data(booking)
    prob = predict_cancel_probability(enriched)
    print(f"[AI Service] Cancel probability: {prob:.2f}")