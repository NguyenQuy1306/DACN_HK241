from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
import os
import random

# Folder paths
source_folder = r"C:\Users\LENOVO\Desktop\selenium\dataReview"
target_folder = r"C:\Users\LENOVO\Desktop\selenium"

# Required columns for target files
fieldnames = [
    "URL", "Name", "Address", "Loại hình", "PriceRange", "Opening Hours",
    "Cuisine", "Telephone", "Phù hợp", "Món đặc sắc", "Không gian",
    "Tổng sức chứa", "Điểm đặc trưng", "Tên tầng", "Sức chứa",
    "Tên tiện ích", "Mô tả tiện ích", "Ngày", "Giờ mở", "Giờ đóng",
    "ExImages", "Kinh độ", "Vĩ độ", "MenuImages", "FoodName", "PriceFood", "MoTaFood", "DanhMuc","TenCombo","GiaComBo","ThoiGianTaoCombo", "Rate", "ReviewText", "PhotoReview", "StayDate", "CreateDate"
]

def update_target_columns(file_path, required_columns):
    updated_rows = []
    header_needs_update = False

    # Open the file to read headers and rows
    if os.path.exists(file_path):
        with open(file_path, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            headers = next(reader, None)  # Get the first row as headers

            # Check if headers exist and if required columns are missing
            if headers is None or set(headers) != set(required_columns):
                header_needs_update = True
                headers = headers if headers else []  # Default to an empty list if no headers
                missing_columns = [col for col in required_columns if col not in headers]
                headers += missing_columns  # Add missing columns to the header
            else:
                missing_columns = []  # No missing columns

            # Read all rows into memory
            for row in reader:
                # Pad rows to match new header length if necessary
                while len(row) < len(headers):
                    row.append("")
                updated_rows.append(row)
    else:
        # If file doesn't exist, create headers
        headers = required_columns
        header_needs_update = True

    # Rewrite the file if the headers need updating or file doesn't exist
    if header_needs_update or not os.path.exists(file_path):
        with open(file_path, mode='w', newline='', encoding='utf-8-sig') as file:
            writer = csv.writer(file)
            writer.writerow(headers)  # Write the updated headers
            writer.writerows(updated_rows)  # Write the existing rows

# Load source data
source_data = []
for filename in os.listdir(source_folder):
    file_path = os.path.join(source_folder, filename)
    if os.path.isfile(file_path) and filename.endswith('.csv'):
        with open(file_path, mode='r', encoding='utf-8-sig') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row:
                    source_data.append(row)

# Process source data and insert into random target files
for source_row in source_data:
    target_files = [f for f in os.listdir(target_folder) if f.startswith("restaurant_data_") and f.endswith(".csv")]
    if not target_files:
        print("No target files found in the target folder.")
        continue

    # Choose a random target file
    target_file = os.path.join(target_folder, random.choice(target_files))
    
    # Ensure the target file has the required columns
    try:
        update_target_columns(target_file, fieldnames)
        with open(target_file, 'a', newline="", encoding='utf-8-sig') as file:
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            
            row_to_insert = {
                "URL": target_file,
                 "Name": "",
                    "Address": "",
                    "Loại hình": "",
                    "PriceRange": "",
                    "Opening Hours": "",
                    "Cuisine": "",
                    "Telephone": "",
                    "Phù hợp": "",
                    "Món đặc sắc": "",
                    "Không gian": "",
                    "Tổng sức chứa": "",
                    "Điểm đặc trưng": "",
                    "Tên tầng": "",
                    "Sức chứa": "",
                    "Tên tiện ích": "",
                    "Mô tả tiện ích": "",
                    "Ngày": "",
                    "Giờ mở": "",
                    "Giờ đóng": "",
                    "ExImages": "",
                    "Kinh độ": "",
                    "Vĩ độ": "",
                    "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": "",
                "Rate": source_row.get("Rating", ""),
                "ReviewText": source_row.get("Review Text", ""),
                "PhotoReview": source_row.get("Photos", ""),
                "StayDate": source_row.get("Created Date", ""),
                "CreateDate": source_row.get("Stay Date", ""),
                # Add default values for required fields missing in source
                # **{col: "" for col in fieldnames if col not in source_row}
            }
            writer.writerow(row_to_insert)
        # print(f"Inserted data into {row_to_insert}")
    except PermissionError as e:
        print(f"PermissionError for file {target_file}: {e}")

print("Processing completed.")
