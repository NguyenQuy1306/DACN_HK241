from kafka import KafkaConsumer, KafkaProducer
from config import BROKER_URL
import json

def get_producer():
    return KafkaProducer(
        bootstrap_servers=BROKER_URL,
        value_serializer=lambda v: json.dumps(v).encode("utf-8")
    )

def get_consumer(topic):
    return KafkaConsumer(
        topic,
        bootstrap_servers=BROKER_URL,
        value_deserializer=lambda v: json.loads(v.decode("utf-8")),
        group_id="cancel-predictor-group"
    )