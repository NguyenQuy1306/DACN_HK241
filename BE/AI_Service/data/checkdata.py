import pandas as pd
import matplotlib.pyplot as plt

class DataBalanceChecker:
    def __init__(self, file_path: str, target_columns: list = None):
        self.file_path = file_path
        self.target_columns = target_columns if target_columns else ["is_arrival"]
        self.df = None

    def load_data(self):
        try:
            self.df = pd.read_csv(self.file_path)
            print(f"[✔] Loaded data from {self.file_path} successfully.")
        except Exception as e:
            print(f"[✘] Failed to load CSV file: {e}")

    def check_imbalance(self):
        if self.df is None:
            print("[!] Data not loaded. Run load_data() first.")
            return

        for col in self.target_columns:
            if col not in self.df.columns:
                print(f"[✘] Column '{col}' not found in data.\n")
                continue

            print(f"\n[INFO] Distribution of '{col}':")
            print(self.df[col].value_counts())
            print(self.df[col].value_counts(normalize=True).apply(lambda x: f"{x:.2%}"))

            self.df[col].value_counts().plot(kind="bar")
            plt.title(f"Distribution of Column: {col}")
            plt.xlabel("Class")
            plt.ylabel("Count")
            plt.xticks(rotation=0)
            plt.tight_layout()
            plt.show()

if __name__ == "__main__":
    file_path = r'C:\Users\LENOVO\Desktop\src_DACN\DACN_HK241\BE\AI_Service\data\sample_reservation_data.csv'
    # Thêm nhiều cột mà bạn muốn kiểm tra
    target_columns = ["is_arrival", "order_id",'total_cancel_bookings','reservation_hour','booking_hour','advance_minutes','total_bookings',"booking_time","reservation_date","reservation_time","num_guests","is_first_booking","day_of_week","avg_user_cancel_rate","payment_status","user_distance_km","used_training"
]


    checker = DataBalanceChecker(file_path, target_columns)
    checker.load_data()
    checker.check_imbalance()
