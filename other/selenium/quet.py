from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

urls = []
with open('quan1.csv', mode='r', encoding='utf-8-sig') as file:
    reader = csv.reader(file)
    for row in reader:
        if row:  
            urls.append(row[0])
print(urls)
driver = webdriver.Chrome()  

previous_tomtat_infor = None
urls=urls[1:]
for url in urls:
    try:
        driver.get(url)
        time.sleep(5)  

        main_div = driver.find_element(By.CSS_SELECTOR, ".item-main.splide")

        images = main_div.find_elements(By.CSS_SELECTOR, ".splide__slide.item img")

        extracted_images = []

        for image in images:
            image_data = {
                "Image": image.get_attribute("data-src"),
                "Name": image.get_attribute("alt"),
            }
            extracted_images.append(image_data)

        restaurant_info = driver.find_element(By.CSS_SELECTOR, ".col-md-12.text-center.pago-thongtin-tomtat")

        restaurant_data = {
            "URL": url,
            "Name": restaurant_info.find_element(By.CSS_SELECTOR, "h1[itemprop='headline']").text,
            "Address": restaurant_info.find_element(By.CSS_SELECTOR, ".text-address").text,
            "Loại hình": restaurant_info.find_element(By.CSS_SELECTOR, ".hours-pickup-tag span:nth-of-type(2) + span").text,
            "PriceRange": restaurant_info.find_element(By.CSS_SELECTOR, "span.pasgo-giatrungbinh").text.replace("đ/người", "").strip(),
            "Opening Hours": restaurant_info.find_element(By.CSS_SELECTOR, "[itemprop='openingHours']").get_attribute("content"),
            "Cuisine": restaurant_info.get_attribute("servesCuisine"),
            "Telephone": restaurant_info.get_attribute("telephone"),
        }

        def get_element_text_or_none(xpath1, xpath2,check):
            try:
                return driver.find_element(By.XPATH, xpath1).text
            except NoSuchElementException:
                try:
                    check[0]=True
                    return driver.find_element(By.XPATH, xpath2).text
                except NoSuchElementException:
                    return None  

        current_tomtat_infor = {
            "Phù hợp": None,
            "Món đặc sắc": None,
            "Không gian": None,
            "Chỗ để xe": None,
            "Điểm đặc trưng": None
        }

        try:
            check = [False]

            current_tomtat_infor = {
                "Phù hợp":  get_element_text_or_none(
                "(//div[@class='summary-content']//div[@class='text-description'])[1]/p[1]",
                "//div[text()='Phù hợp:']/following-sibling::div[@class='text-description']",check
            ),
                            
                "Món đặc sắc": get_element_text_or_none(
                "(//div[@class='summary-content']//div[@class='text-description'])[1]/p[2]",
                "//div[text()='Món đặc sắc:']/following-sibling::div[@class='text-description']",check
            ),
                "Không gian": "",
                "Chỗ để xe": "",
                "Điểm đặc trưng": ""
            }
            if check[0] ==False:
                khong_gian_full_text = driver.find_element(By.XPATH, "(//div[@class='summary-content']//div[@class='text-description'])[2]").text

                if "CHỖ ĐỂ XE:" in khong_gian_full_text:
                    khong_gian_text, cho_de_xe_text = khong_gian_full_text.split("CHỖ ĐỂ XE:", 1)
                    current_tomtat_infor["Không gian"] = khong_gian_text.strip()

                    if "ĐIỂM ĐẶC TRƯNG:" in cho_de_xe_text:
                        cho_de_xe_text, diem_dac_trung_text = cho_de_xe_text.split("ĐIỂM ĐẶC TRƯNG:", 1)
                        current_tomtat_infor["Chỗ để xe"] = cho_de_xe_text.strip()
                        current_tomtat_infor["Điểm đặc trưng"] = diem_dac_trung_text.strip()
                    else:
                        current_tomtat_infor["Chỗ để xe"] = cho_de_xe_text.strip()
            else:
                current_tomtat_infor["Không gian"]=driver.find_element(By.XPATH, "//div[text()='Không gian:']/following-sibling::div[@class='text-description']").text
                current_tomtat_infor["Điểm đặc trưng"]=driver.find_element(By.XPATH, "//div[text()='Điểm đặc trưng:']/following-sibling::div[@class='text-description']").text
                current_tomtat_infor["Chỗ để xe"]=driver.find_element(By.XPATH, "//div[text()='Chỗ để xe:']/following-sibling::div[@class='text-description']").text



        except NoSuchElementException:
            if previous_tomtat_infor is not None:
                current_tomtat_infor = previous_tomtat_infor

        previous_tomtat_infor = current_tomtat_infor


        khong_gian = current_tomtat_infor['Không gian']
        khong_gian_lines = khong_gian.split("\n")
        first_line = khong_gian_lines[0][2:]  
        if len(khong_gian_lines) > 1 and khong_gian_lines[1].strip():
            second_line = khong_gian_lines[1]
            text, tong_suc_chua = second_line.split(":")
        else:
            text = "Sức chứa:"
            tong_suc_chua = "100 khách"
        
        tang_info = []
        if len(khong_gian_lines) > 2 and khong_gian_lines[2].strip():
            for line in khong_gian_lines[2:]:
                if any(keyword in line for keyword in ["Tầng", "Khu vực", "Phòng riêng"]):
                    if ":" in line:
                        tang_name, suc_chua = line.split(":", 1)
                        if tang_name.startswith("P"):
                            tang_name = tang_name[1:]
                        else:
                            tang_name = tang_name[2:]
                        tang_info.append({
                            "Tên tầng": tang_name.strip(),
                            "Sức chứa": suc_chua.strip()
                        })
        else:
            tang_info.append({
                "Tên tầng": "Tầng 1",
                "Sức chứa": "20 khách"
            })

        tien_ich = current_tomtat_infor['Chỗ để xe']
        tien_ich_lines = tien_ich.split("\n") if tien_ich else []
        tienich_info = []
        for line in tien_ich_lines:
            if "máy" in line or "ô tô" in line:
                tienich_name, mota = line.split(":")
                tienich_name = "Chỗ để " + tienich_name[2:].lower().strip()
                tienich_info.append({
                    "Tên": tienich_name.strip(),
                    "Mô tả": mota.strip()
                })

        giohoatdong_infor_list = []
        rows = driver.find_elements(By.CSS_SELECTOR, ".time-order .row-app")

        for row in rows:
            day_element = row.find_element(By.CSS_SELECTOR, ".col-xs-app-6:first-child .txt-title")
            time_element = row.find_element(By.CSS_SELECTOR, ".col-xs-app-6:last-child .txt-title")
            
            day = day_element.text.strip()
            time_text = time_element.get_attribute("innerText").strip()
            
            time_lines = time_text.split("\n")
            time_range = time_lines[1].strip() if len(time_lines) > 1 else time_lines[0].strip() 
            
            timeopen, timeclose = time_range.split(" - ")
            
            giohoatdong_infor_list.append({
                "Ngày": day,
                "Giờ mở": timeopen,
                "Giờ đóng": timeclose
            })
        
        ggmaps_infor = {
        "Kinh độ": 106.700981,   
        "Vĩ độ": 10.779664       
        }
        ggmaps = driver.find_element(By.CSS_SELECTOR, ".content .maps-direct a")
        href = ggmaps.get_attribute("href")
        if href:
            coordinates = href.split("/place/")[1].split(",")
            latitude = float(coordinates[0])
            longitude = float(coordinates[1])
            
            ggmaps_infor = {
                "Kinh độ": longitude,
                "Vĩ độ": latitude
            }
            


        csv_file_name = f"restaurant_data_{url.split('/')[-1]}.csv"

        with open(csv_file_name, mode="w", newline="", encoding="utf-8-sig") as file:
            writer = csv.DictWriter(file, fieldnames=["URL", "Name", "Address", "Loại hình", "PriceRange", "Opening Hours",
                "Cuisine", "Telephone", "Phù hợp", "Món đặc sắc", "Không gian",
                "Tổng sức chứa", "Điểm đặc trưng", "Tên tầng", "Sức chứa",
                "Tên tiện ích", "Mô tả tiện ích", "Ngày", "Giờ mở", "Giờ đóng",
                "ExImages", "Kinh độ", "Vĩ độ", "MenuImages","FoodName","PriceFood","MoTaFood","DanhMuc"])
            writer.writeheader()  
            
            writer.writerow(restaurant_data)
            summary_row = {
                "URL": url,
                "Name": "",
                "Address": "",
                "Loại hình": "",
                "PriceRange": "",
                "Opening Hours": "",
                "Cuisine": "",
                "Telephone": "",
                "Phù hợp": current_tomtat_infor["Phù hợp"],
                "Món đặc sắc": current_tomtat_infor["Món đặc sắc"],
                "Không gian": first_line,
                "Tổng sức chứa":tong_suc_chua,
                "Điểm đặc trưng": current_tomtat_infor["Điểm đặc trưng"],
                "Tên tầng": "",
                "Sức chứa": "",
                "Tên tiện ích": "",
                "Mô tả tiện ích": "",
                "Ngày": "",
                "Giờ mở": "",
                "Giờ đóng": "",
                "ExImages": "" ,
                "Kinh độ":ggmaps_infor["Kinh độ"], 
                "Vĩ độ":ggmaps_infor["Vĩ độ"],
                "MenuImages":"",
                "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": ""
            }
            writer.writerow(summary_row)

            for tang in tang_info:
                writer.writerow({
                    "URL": url,
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
                    "Tổng sức chứa":"",
                    "Điểm đặc trưng": "",
                    "Tên tầng": tang["Tên tầng"],
                    "Sức chứa": tang["Sức chứa"],
                    "Tên tiện ích": "",
                    "Mô tả tiện ích": "",
                    "Ngày": "",
                    "Giờ mở": "",
                    "Giờ đóng": "",
                    "ExImages": ""  ,
                    "Kinh độ":"",
                    "Vĩ độ":"",
                    "MenuImages":"",
                    "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": ""
                })

            for tienich in tienich_info:
                writer.writerow({
                    "URL": url,
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
                    "Tổng sức chứa":"",
                    "Điểm đặc trưng": "",
                    "Tên tầng": "",
                    "Sức chứa": "",
                    "Tên tiện ích": tienich["Tên"],
                    "Mô tả tiện ích": tienich["Mô tả"],
                    "Ngày": "",
                    "Giờ mở": "",
                    "Giờ đóng": "",
                    "ExImages": "", 
                    "Kinh độ":"",
                    "Vĩ độ":"",
                    "MenuImages":"",
                    "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": ""
                })

            for giohoatdong in giohoatdong_infor_list:
                writer.writerow({
                    "URL": url,
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
                    "Tổng sức chứa":"",
                    "Điểm đặc trưng": "",
                    "Tên tầng": "",
                    "Sức chứa": "",
                    "Tên tiện ích": "",
                    "Mô tả tiện ích": "",
                    "Ngày": giohoatdong["Ngày"],
                    "Giờ mở": giohoatdong["Giờ mở"],
                    "Giờ đóng": giohoatdong["Giờ đóng"],
                    "ExImages": ""  ,
                    "Kinh độ":"",
                    "Vĩ độ":"",
                    "MenuImages":"",
                    "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": ""

                })
            for image in extracted_images:
                writer.writerow({
                    "URL": url,
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
                    "Tổng sức chứa":"",
                    "Điểm đặc trưng": "",
                    "Tên tầng": "",
                    "Sức chứa": "",
                    "Tên tiện ích": "",
                    "Mô tả tiện ích": "",
                    "Ngày": "",
                    "Giờ mở": "",
                    "Giờ đóng": "",
                    "ExImages": f"{image['Name']}: {image['Image']}",
                    "Kinh độ":"",
                    "Vĩ độ":""  ,
                    "MenuImages":"",
                    "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": ""
                })

        print(f"Data for {url} has been written to {csv_file_name}")
    except Exception as e:
        print(f"Error occurred for URL {url}: {e}. Skipping to the next URL.")
        continue
driver.quit()
