from kafka import KafkaConsumer, KafkaProducer
from app.config.config import BROKER_URL
import json
import time
import logging

def get_producer(retries=5, delay=5):
    for attempt in range(retries):
        try:
            return KafkaProducer(
                bootstrap_servers=BROKER_URL,
                value_serializer=lambda v: json.dumps(v).encode("utf-8")
            )
        except Exception as e:
            logging.warning(f"[KafkaProducer] Attempt {attempt+1}/{retries} failed. Retrying in {delay} seconds... Error: {e}")
            time.sleep(delay)
    raise Exception("[KafkaProducer] All retry attempts failed. Could not connect to Kafka.")

def get_consumer(topic, retries=5, delay=5):
    for attempt in range(retries):
        try:
            return KafkaConsumer(
                topic,
                bootstrap_servers=BROKER_URL,
                value_deserializer=lambda v: json.loads(v.decode("utf-8")),
                group_id="cancel-predictor-group",
                auto_offset_reset='latest',
            )
        except Exception as e:
            logging.warning(f"[KafkaConsumer] Attempt {attempt+1}/{retries} failed. Retrying in {delay} seconds... Error: {e}")
            time.sleep(delay)
    raise Exception("[KafkaConsumer] All retry attempts failed. Could not connect to Kafka.")
