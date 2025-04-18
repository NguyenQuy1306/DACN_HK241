import logging
from app.config.kafka_config import get_consumer
from app.utils.processes import camel_to_snake, enrich_booking_data
from app.models.cancel_prediction.predict_cancel_probability import predict_cancel_probability
from app.config.config import CANCEL_TOPIC
from app.config.config import CANCEL_RESULT_TOPIC
from app.config.kafka_config import get_producer
import json
def run_kafka_cancel_consumer():
    logging.info(f"[Kafka] Start listening to topic: {CANCEL_TOPIC}")
    consumer = get_consumer(CANCEL_TOPIC)
    producer = get_producer()
    for message in consumer:
        try:
            logging.info(f"[Kafka] Raw message: {message.value}")
            data_snake = camel_to_snake(message.value)
            logging.info(f"[Kafka] Converted message: {data_snake}")
            enriched = enrich_booking_data(data_snake)
            logging.info(f"[Kafka] Enriched booking data: {enriched}")

            # Dự đoán xác suất hủy
            prob = predict_cancel_probability(enriched)
            logging.info("[Kafka AI Service] OUTSIDE: %.2f", float(prob))
            result_payload = {
                "user_id": enriched.get("user_id"),
                "order_id": enriched.get("order_id"),
                "cancel_probability": round(float(prob), 4)
            }

            producer.send(CANCEL_RESULT_TOPIC, value=result_payload)
            producer.flush()
            logging.info(f"[Kafka] Sent prediction result to topic {CANCEL_RESULT_TOPIC}")
        except Exception as e:
            logging.error(f"[Kafka] Error processing message: {e}")
            continue 


    logging.info("[Kafka] Finished listening")
