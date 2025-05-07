import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import logging
import schedule
import time
from app.models.cancel_prediction.batch_trainer import retrain_if_enough_data

# Cấu hình logging
logging.basicConfig(
    filename="scheduler.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


def retrain_job():
    logging.info("Scheduler calling retrain job...")
    retrain_if_enough_data(batch_size=10)


schedule.every(1).minutes.do(retrain_job)

logging.info("Scheduler started...")

while True:
    schedule.run_pending()
    time.sleep(1)
