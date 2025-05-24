import pg8000.dbapi
import csv
import os
from datetime import datetime
import random
from datetime import datetime, timedelta

conn = pg8000.dbapi.Connection(
    user="postgres", password="Ngocquynguyen1", host="159.223.43.202", port=5433, database="curcus",
    ssl_context=None
)
cur = conn.cursor()

folder_path = 'C:/Users/LENOVO/Desktop/src_DACN/selenium'
# Loop through all CSV files in the folder
for filename in os.listdir(folder_path):
    if filename.startswith("restaurant_data_") and filename.endswith(".csv"):
        csv_file_name = os.path.join(folder_path, filename)
        
        try:
            with open(csv_file_name, newline='', encoding='utf-8-sig') as csvfile:
                reader = csv.DictReader(csvfile)
                
                # Insert data from the CSV file
                restaurant_data_first_row = next(reader)
                restaurant_data_second_row = next(reader)
                random_maxtable = random.randint(10, 30)

                cur.execute(""" 
                    INSERT INTO nhahang (url, ten, diachi, loaihinh, khoanggia, giohoatdong, mondacsac, diemdactrung, phuhop, motakhonggian, kinhdo, vido, thanhpho, maxtable)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING masonhahang;
                """, (
                    restaurant_data_first_row['URL'], 
                    restaurant_data_first_row['Name'], 
                    restaurant_data_first_row['Address'], 
                    restaurant_data_first_row['Loại hình'],
                    restaurant_data_first_row['PriceRange'], 
                    restaurant_data_first_row['Opening Hours'],
                    restaurant_data_second_row['Món đặc sắc'], 
                    restaurant_data_second_row['Điểm đặc trưng'],
                    restaurant_data_second_row['Phù hợp'], 
                    restaurant_data_second_row['Không gian'],
                    float(restaurant_data_second_row['Kinh độ']), 
                    float(restaurant_data_second_row['Vĩ độ']),
                    "TP Hồ Chí Minh",
                    random_maxtable  # <-- random maxtable 10-30 bàn
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
                    
                    danhmuc = row["DanhMuc"].strip()
                    if danhmuc:
                        if row["TenCombo"]:
                            cur.execute(""" 
                                INSERT INTO combocosan (ten, gia, masonhahang, thoigiantao)
                                VALUES (%s, %s, %s, %s)
                                RETURNING masocombocosan;
                            """, (row["TenCombo"].strip(), row["GiaComBo"].strip(), restaurant_id, row["ThoiGianTaoCombo"].strip()))
                            
                            combocosan_id = cur.fetchone()[0]
                            dish_names = [dish.strip() for dish in row["FoodName"].split('#')]
                            dish_prices = [price.strip() for price in row["PriceFood"].split('#')]

                            if len(dish_names) != len(dish_prices):
                                # print("url:: ", row["URL"])
                                # print("row[ơ0]::", row["FoodName"][0])
                                # print("row[1]::", row["FoodName"][1])
                                # print("row[2]::", row["FoodName"][2])

                                # print("dish_names:: ", dish_names)
                                # print("dish_prices:: ", dish_prices)
                                # print(len(dish_names),"::", len(dish_prices))
                                raise ValueError("Mismatch between the number of dish names and prices.")

                            for dish_name, dish_price in zip(dish_names, dish_prices):
                                cur.execute("""
                                    SELECT masomonan FROM monan WHERE ten = %s AND gia = %s
                                """, (dish_name, dish_price))
                                
                                # Fetch the dish ID
                                result = cur.fetchone()
                                if result:
                                    monan_id = result[0]  
                                    # print(combocosan_id,"::", monan_id)
                                    cur.execute("""
                                        INSERT INTO combocosan_co_monan (masocombocosan, masomonan)
                                        VALUES (%s, %s);
                                    """, (combocosan_id, monan_id))
                        else:
                            cur.execute(""" 
                                SELECT COUNT(*) FROM danhmuc 
                                WHERE masonhahang = %s AND ten = %s;
                            """, (restaurant_id, danhmuc))
                            exists = cur.fetchone()[0]

                            if exists == 0:
                                cur.execute(""" 
                                    INSERT INTO danhmuc (masonhahang, ten)
                                    VALUES (%s, %s)
                                    RETURNING masodanhmuc;
                                """, (restaurant_id, danhmuc))
                                danhmuc_id = cur.fetchone()[0]  
                            else:
                                cur.execute(""" 
                                    SELECT masodanhmuc FROM danhmuc 
                                    WHERE masonhahang = %s AND ten = %s;
                                """, (restaurant_id, danhmuc))
                                danhmuc_id = cur.fetchone()[0]  
                            cur.execute(""" 
                                INSERT INTO monan (masodanhmuc, ten, gia, mota,trangthai)
                                VALUES (%s, %s, %s, %s,%s);
                            """, (danhmuc_id, row["FoodName"].strip(), row["PriceFood"].strip(), row["MoTaFood"].strip(),"Active"))
                    if row["Rate"]:
                        cur.execute("SELECT masonguoidung FROM nguoidung")
                        user_ids = [row[0] for row in cur.fetchall()]
                        used_user_ids = set()
                        available_user_ids = [uid for uid in user_ids if uid not in used_user_ids]
                        
                        if available_user_ids:
                            random_user_id = random.choice(available_user_ids)
                            used_user_ids.add(random_user_id)
                            stay_date_raw = row["StayDate"].strip()
                            try:
                                stay_date = datetime.strptime(stay_date_raw, "%Y-%m-%d") 
                            except ValueError:
                                stay_date = datetime.strptime(stay_date_raw, "%m/%d/%Y") 

                        if not row["CreateDate"] or not row["CreateDate"].strip():  
                            create_date = stay_date + timedelta(days=2)  
                        else:
                            create_date_raw = row["CreateDate"].strip()
                            try:
                                create_date = datetime.strptime(create_date_raw, "%Y-%m-%d")  
                            except ValueError:
                                create_date = datetime.strptime(create_date_raw, "%m/%d/%Y")

                        stay_date_str = stay_date.strftime("%Y-%m-%d")
                        create_date_str = create_date.strftime("%Y-%m-%d")

                        cur.execute("""
                            INSERT INTO danhgia (sao, masonguoidung, masonhahang, thoigiantrainghiem, thoigiancapnhat, noidung)
                            VALUES (%s, %s, %s, %s, %s, %s)
                            RETURNING masodanhgia;
                        """, (row["Rate"].strip(), random_user_id, restaurant_id, stay_date_str, create_date_str, row["ReviewText"].strip()))
                        danhgia_id = cur.fetchone()[0]  
                        if row["PhotoReview"]:
                            photo_urls = row["PhotoReview"].strip().split('\n')  

                            for url in photo_urls:
                                cur.execute(""" 
                                    INSERT INTO anhnhahang (masonhahang, kieuanh, url,masodanhgia)
                                    VALUES (%s, %s, %s,%s);
                                """, (restaurant_id, "USERIMAGE", url.strip(),danhgia_id))
            conn.commit()  
            
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            conn.rollback()  

# Close the cursor and connection
cur.close()
conn.close()
