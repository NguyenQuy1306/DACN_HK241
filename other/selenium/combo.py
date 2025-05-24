import os
import csv
import random
import pg8000.dbapi
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException

# Database connection setup
conn = pg8000.dbapi.Connection(
    user="postgres", password="Ngocquynguyen1", host="localhost", port=5432, database="curcus",
    ssl_context=None
)
cur = conn.cursor()

# Define folder path and CSV fieldnames
folder_path = '/Users/LENOVO/Desktop/selenium'
fieldnames = [
    "URL", "Name", "Address", "Loại hình", "PriceRange", "Opening Hours",
    "Cuisine", "Telephone", "Phù hợp", "Món đặc sắc", "Không gian",
    "Tổng sức chứa", "Điểm đặc trưng", "Tên tầng", "Sức chứa",
    "Tên tiện ích", "Mô tả tiện ích", "Ngày", "Giờ mở", "Giờ đóng",
    "ExImages", "Kinh độ", "Vĩ độ", "MenuImages", "FoodName", "PriceFood", "MoTaFood", "DanhMuc","TenCombo","GiaComBo","ThoiGianTaoCombo"
]

for filename in os.listdir(folder_path):
    if filename.startswith("restaurant_data_") and filename.endswith(".csv"):
        csv_file_name = os.path.join(folder_path, filename)
        
        try:
            # Load data and check if header matches
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
                        writer.writerows({field: value for field, value in zip(headers, row)} for row in rows)

                # Store the index of the relevant headers
                danh_muc_index = headers.index("DanhMuc")
                food_name_index = headers.index("FoodName")
                price_food_index = headers.index("PriceFood")
                mota_food_index = headers.index("MoTaFood")

                # Filter rows to generate combos using indices
                monan_data_from_local = [
                    {
                        "DanhMuc": row[danh_muc_index],
                        "FoodName": row[food_name_index],
                        "PriceFood": row[price_food_index],
                        "MoTaFood": row[mota_food_index]
                    }
                    for row in rows if row[danh_muc_index].strip()
                ]

                # Debugging: print filtered data
                print(f"Filtered food data: {monan_data_from_local}")

                # Generate 5 random combos, each with 1 to 5 unique items
                combos = []
                for _ in range(5):
                    num_items = random.randint(2, 5)
                    combo = random.sample(monan_data_from_local, min(num_items, len(monan_data_from_local)))
                    combos.append(combo)

                with open(csv_file_name, 'a', newline='', encoding='utf-8-sig') as csvfile:
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

                    for i, combo in enumerate(combos, start=1):
                        danhmuc = '# '.join(dish['DanhMuc'] for dish in combo)
                        foodname = '# '.join(dish['FoodName'] for dish in combo)
                        pricefood = '# '.join(dish['PriceFood'] for dish in combo)
                        motafood = '# '.join(dish['MoTaFood'] for dish in combo)

                        writer.writerow({
                            "URL": csv_file_name,
                            "TenCombo": f"Combo {i}",
                            "GiaComBo": sum(int(dish['PriceFood']) for dish in combo if dish['PriceFood'].isdigit()),
                            "ThoiGianTaoCombo": time.strftime("%Y-%m-%d %H:%M:%S"),
                            "DanhMuc": danhmuc,
                            "FoodName": foodname,
                            "PriceFood": pricefood,
                            "MoTaFood": motafood
                        })
        except Exception as e:
            print(f"Error occurred for file {csv_file_name}: {e}. Skipping to the next file.")
            continue
