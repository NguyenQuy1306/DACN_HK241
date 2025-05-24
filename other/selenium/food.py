from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
import os
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException

# Load restaurant data from input CSV
restaurant_data = []
with open('form.csv', mode='r', encoding='utf-8-sig') as file:
    reader = csv.DictReader(file)
    for row in reader:
        if row:
            restaurant_data.append(row)

driver = webdriver.Chrome()

# Define column headers
fieldnames = [
    "URL", "Name", "Address", "Loại hình", "PriceRange", "Opening Hours",
    "Cuisine", "Telephone", "Phù hợp", "Món đặc sắc", "Không gian",
    "Tổng sức chứa", "Điểm đặc trưng", "Tên tầng", "Sức chứa",
    "Tên tiện ích", "Mô tả tiện ích", "Ngày", "Giờ mở", "Giờ đóng",
    "ExImages", "Kinh độ", "Vĩ độ", "MenuImages", "FoodName", "PriceFood", "MoTaFood", "DanhMuc"
]

# Iterate over each restaurant
for data in restaurant_data:
    try:
        # Extract URL and restaurant_id
        url = data['URL']
        restaurant_id = url.replace("https://pasgo.vn/nha-hang/", "")
        csv_file_name = f"restaurant_data_{restaurant_id}.csv"
        
        # Check if CSV file exists and if header needs updating
        rows = []
        header_needs_update = False

        if os.path.isfile(csv_file_name):
            # Read the file, checking the header and storing existing rows
            with open(csv_file_name, 'r', newline='', encoding='utf-8-sig') as csvfile:
                reader = csv.reader(csvfile)
                headers = next(reader, None)  # Get first row (header)

                if headers is None or set(fieldnames) != set(headers):
                    header_needs_update = True  # Flag for header update if incomplete

                for row in reader:
                    rows.append(row)  # Store existing rows

            # Rewrite file with updated header only if needed, preserving data rows
            if header_needs_update:
                with open(csv_file_name, 'w', newline='', encoding='utf-8-sig') as csvfile:
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                    writer.writeheader()  # Write the full header
                    writer.writerows({field: value for field, value in zip(headers, row)} for row in rows)  # Preserve data rows

            # Append new food data to the CSV
            with open(csv_file_name, 'a', newline='', encoding='utf-8-sig') as file:
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                writer.writerow({
                    "URL": data['URL'],
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
                    "MenuImages": "",
                    "FoodName": data.get('Ten', ''),
                    "PriceFood": data.get('Gia', ''),
                    "MoTaFood": data.get('MoTa', ''),
                    "DanhMuc": data.get('DanhMuc', '')
                })

            # print(f"Data for {url} has been appended to {csv_file_name}")

    except Exception as e:
        print(f"Error occurred for URL {url}: {e}. Skipping to the next URL.")
        continue

driver.quit()
