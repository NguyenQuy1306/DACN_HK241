import pg8000.dbapi
import csv
import os
from datetime import datetime

conn = pg8000.dbapi.Connection(
    user="postgres", password="Nhut3030", host="localhost", port=5433, database="themealv3",
    ssl_context=None
)
cur = conn.cursor()

folder_path = "D:\\HK242\\DATN\\DACN_HK241\\Import Data"

# Loop through all CSV files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith(".csv"):
        csv_file_name = os.path.join(folder_path, filename)
        
        try:
            with open(csv_file_name, newline='', encoding='utf-8-sig') as csvfile:
                reader = csv.DictReader(csvfile)
                
                # Insert data from the CSV file
                restaurant_data_first_row = next(reader)
                restaurant_data_second_row = next(reader)
                cur.execute("""
                    INSERT INTO nhahang (url, ten, diachi, loaihinh, khoanggia, giohoatdong, mondacsac, diemdactrung, phuhop, motakhonggian, kinhdo, vido)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING masonhahang;
                """, (
                    restaurant_data_first_row['URL'], restaurant_data_first_row['Name'], restaurant_data_first_row['Address'], restaurant_data_first_row['Loại hình'],
                    restaurant_data_first_row['PriceRange'], restaurant_data_first_row['Opening Hours'],
                    restaurant_data_second_row['Món đặc sắc'], restaurant_data_second_row['Điểm đặc trưng'],
                    restaurant_data_second_row['Phù hợp'], restaurant_data_second_row['Không gian'],
                    float(restaurant_data_second_row['Kinh độ']), float(restaurant_data_second_row['Vĩ độ'])
                ))
                restaurant_id = cur.fetchone()[0]
                
                for row in reader:
                    if row["Tên tầng"]:
                        cur.execute("""
                            INSERT INTO khonggiannhahang (masonhahang, tentang, soluongghe)
                            VALUES (%s, %s, %s);
                        """, (restaurant_id, row["Tên tầng"], row["Sức chứa"]))
                    
                    if row["Tên tiện ích"]:
                        cur.execute("""
                            INSERT INTO tienich (ten, mota)
                            VALUES (%s, %s)
                            RETURNING masotienich;
                        """, (row["Tên tiện ích"], row["Mô tả tiện ích"]))
                        tienich_id = cur.fetchone()[0]
                        cur.execute("""
                            INSERT INTO nhahang_co_tienich (masonhahang, masotienich)
                            VALUES (%s, %s);
                        """, (restaurant_id, tienich_id))
                    
                    if row["Ngày"]:
                        gio_mo = datetime.strptime(row["Giờ mở"], "%H:%M").time()
                        gio_dong = datetime.strptime(row["Giờ đóng"], "%H:%M").time()
                        cur.execute("""
                            INSERT INTO khunggiohoatdong (masonhahang, ngaytrongtuan, giomo, giodong)
                            VALUES (%s, %s, %s, %s);
                        """, (restaurant_id, row["Ngày"], gio_mo, gio_dong))
                    
                    if row["ExImages"]:
                        _, url_split = row["ExImages"].split(": ", 1)
                        cur.execute("""
                            INSERT INTO anhnhahang (masonhahang, kieuanh, url)
                            VALUES (%s, %s, %s);
                        """, (restaurant_id, "RESTAURANTIMAGE", url_split.strip()))
                    
                    if row["MenuImages"]:
                        cur.execute("""
                            INSERT INTO anhnhahang (masonhahang, kieuanh, url)
                            VALUES (%s, %s, %s);
                        """, (restaurant_id, "MENUIMAGE", row["MenuImages"].strip()))
            
            conn.commit()  # Commit for each file if no error occurs
            
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            conn.rollback()  # Rollback any changes made during this file's processing

# Close the cursor and connection
cur.close()
conn.close()
