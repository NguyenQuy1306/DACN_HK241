
# import logging
# from flask import Flask
# import threading
# import time
# import schedule
# from app.routers.recommend import recommend_bp
# from app.routers.cancel import predict_router
# from app.kafka.consumers.cancel_consumer import run_kafka_cancel_consumer

# # Import file cancel_scheduler.py
# from app.models.cancel_prediction.batch_trainer import retrain_if_enough_data

# # Cấu hình logging
# logging.basicConfig(
#     filename="/app/logs/scheduler.log",  # Đảm bảo đường dẫn chính xác
#     level=logging.INFO,
#     format="%(asctime)s - %(levelname)s - %(message)s"
# )
# # import os

# # log_dir = os.path.join(os.path.dirname(__file__), '..', 'logs')
# # os.makedirs(log_dir, exist_ok=True)  # Tạo thư mục nếu chưa có

# # log_file_path = os.path.join(log_dir, 'scheduler.log')

# # logging.basicConfig(
# #     filename=log_file_path,
# #     level=logging.INFO,
# #     format="%(asctime)s - %(levelname)s - %(message)s"
# # )

# # Hàm chạy scheduler
# def run_scheduler():
#     def retrain_job():
#         logging.info("Scheduler calling retrain job...")
#         retrain_if_enough_data(batch_size=10)

#     schedule.every(1).minutes.do(retrain_job)
#     logging.info("Scheduler started...")

#     while True:
#         schedule.run_pending()
#         time.sleep(1)

# # Khởi tạo Flask app
# app = Flask(__name__)
# app.register_blueprint(recommend_bp, url_prefix="/recommend")
# app.register_blueprint(predict_router)

# # Tạo một thread để chạy scheduler đồng thời với Flask app
# # scheduler_thread = threading.Thread(target=run_scheduler)
# # scheduler_thread.daemon = True  # Khi Flask app tắt, scheduler cũng sẽ tắt
# # scheduler_thread.start()

# kafka_thread = threading.Thread(target=run_kafka_cancel_consumer)
# kafka_thread.daemon = True
# kafka_thread.start()
# if __name__ == "__main__":
#     app.run(debug=True, use_reloader=False)  # `use_reloader=False` giúp tránh việc Flask khởi động lại nhiều lần



import logging
from flask import Flask
import threading
import time
import schedule

from app.routers.recommend import recommend_bp
from app.routers.cancel import predict_router
from app.kafka.consumers.cancel_consumer import run_kafka_cancel_consumer
from app.models.cancel_prediction.batch_trainer import retrain_if_enough_data

# Cấu hình logging
logging.basicConfig(
    filename="/app/logs/scheduler.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Hàm chạy scheduler định kỳ
def run_scheduler():
    def retrain_job():
        logging.info("Scheduler calling retrain job...")
        retrain_if_enough_data(batch_size=10)

    schedule.every(1).minutes.do(retrain_job)
    logging.info("Scheduler started...")

    while True:
        schedule.run_pending()
        time.sleep(1)

# Khởi tạo Flask app
app = Flask(__name__)
app.register_blueprint(recommend_bp, url_prefix="/recommend")
app.register_blueprint(predict_router)

def start_background_threads():
    kafka_thread = threading.Thread(target=run_kafka_cancel_consumer, daemon=True)
    kafka_thread.start()
    logging.info("[Kafka] Consumer thread started")

    # Nếu muốn bật scheduler luôn, bật đoạn sau:
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()
    logging.info("[Scheduler] Scheduler thread started")

# Sử dụng with app.app_context() để khởi tạo các background threads
def create_app():
    with app.app_context():
        start_background_threads()
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', debug=True, use_reloader=False)
