import pandas as pd
from train_model import train_and_save_model

# Đường dẫn tới file CSV
csv_file_path = 'train_data.csv'

# Đọc dữ liệu từ CSV
df = pd.read_csv(csv_file_path)

# Gọi hàm train model và lưu model
train_and_save_model(df)
