import pandas as pd
from train_model import train_and_save_model

csv_file_path = 'train_data.csv'

df = pd.read_csv(csv_file_path)

train_and_save_model(df)
