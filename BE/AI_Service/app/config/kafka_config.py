from kafka import KafkaConsumer, KafkaProducer
from app.config.config import BROKER_URL
import json
import time
import logging
def get_producer():
    return KafkaProducer(
        bootstrap_servers=BROKER_URL,
        value_serializer=lambda v: json.dumps(v).encode("utf-8")
    )

def get_consumer(topic):
    while True:
        try: 
            return KafkaConsumer(
                topic,
                bootstrap_servers=BROKER_URL,
                value_deserializer=lambda v: json.loads(v.decode("utf-8")),
                group_id="cancel-predictor-group",
                auto_offset_reset='latest',
            )
        except Exception as e:
            logging.info(f"[Kafka] Not ready yet, retrying in 5 seconds... Error: {e}")
            time.sleep(5)
