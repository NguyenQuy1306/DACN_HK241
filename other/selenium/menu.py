from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException

urls = []
with open('quan1.csv', mode='r', encoding='utf-8-sig') as file:
    reader = csv.reader(file)
    for row in reader:
        if row:
            urls.append(row[0])
driver = webdriver.Chrome()

urls = urls[1:]  # Skip the header row if present
previous_extracted_menu_images = []

for url in urls:
    try:
        driver.get(url)
        
        try:
            # Wait for the 'mobile-price-list' to be visible
            quy = driver.find_element(By.ID, "mobile-price-list")
            WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.ID, "mobile-price-list"))
            )

            # Scroll to the 'mobile-price-list' div
            mobile_price_list = driver.find_element(By.ID, "mobile-price-list")
            driver.execute_script("arguments[0].scrollIntoView();", mobile_price_list)
            time.sleep(1)

            # Attempt to click the first item in the list
            first_item = mobile_price_list.find_element(By.CSS_SELECTOR, ".items.col-md-4")
            try:
                WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".items.col-md-4")))
                first_item.click()
            except ElementClickInterceptedException:
                print(f"Click intercepted on the first item for URL {url}. Retrying after waiting.")
                time.sleep(2)
                driver.execute_script("arguments[0].click();", first_item)

            WebDriverWait(driver, 5).until(
                EC.visibility_of_element_located((By.ID, "next-lightbox"))
            )

            # Extract menu images
            menu_images = driver.find_elements(By.CSS_SELECTOR, ".gallery .lightbox__info--thumbnail-list .swiper-slide img")
            extracted_menu_images = [
                {"Image": menu_image.get_attribute("data-src") or menu_image.get_attribute("src")}
                for menu_image in menu_images
            ]

        except NoSuchElementException:
            print(f"'mobile-price-list' not found for URL {url}. Using previous menu images.")
            extracted_menu_images = previous_extracted_menu_images  # Use previous images if 'mobile-price-list' not found

        # Append data to the existing CSV file
        restaurant_id = url.replace("https://pasgo.vn/nha-hang/", "")
        csv_file_name = f"restaurant_data_{restaurant_id}.csv"
        
        with open(csv_file_name, mode="a", newline="", encoding="utf-8-sig") as file:
            writer = csv.DictWriter(file, fieldnames=[
                "URL", "Name", "Address", "Loại hình", "PriceRange", "Opening Hours",
                "Cuisine", "Telephone", "Phù hợp", "Món đặc sắc", "Không gian",
                "Tổng sức chứa", "Điểm đặc trưng", "Tên tầng", "Sức chứa",
                "Tên tiện ích", "Mô tả tiện ích", "Ngày", "Giờ mở", "Giờ đóng",
                "ExImages", "Kinh độ", "Vĩ độ", "MenuImages","FoodName","PriceFood","MoTaFood","DanhMuc"
            ])
            
            for image in extracted_menu_images:
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
                    "MenuImages": image["Image"],
                    "FoodName": "",
                    "PriceFood": "",
                    "MoTaFood": "",
                    "DanhMuc": ""
                })

        previous_extracted_menu_images = extracted_menu_images  # Update previous images
        print(f"Data for {url} has been appended to {csv_file_name}")

    except Exception as e:
        print(f"Error occurred for URL {url}: {e}. Skipping to the next URL.")
        continue

driver.quit()
