from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
import time

urls = [
    "https://pasgo.vn/tim-kiem?search=quận+1",
    "https://pasgo.vn/tim-kiem?search=quận+1&page=2",
    "https://pasgo.vn/tim-kiem?search=quận+1&page=3",
    "https://pasgo.vn/tim-kiem?search=quận+1&page=4",
    "https://pasgo.vn/tim-kiem?search=quận+1&page=5",
    "https://pasgo.vn/tim-kiem?search=quận+1&page=6",
]

driver = webdriver.Chrome()

all_urls = []

for url in urls:
    driver.get(url)
    time.sleep(5) 

    items = driver.find_elements(By.CLASS_NAME, "item-link-image")
    for item in items:
        all_urls.append(item.get_attribute("href"))

csv_file_path = "quan1.csv"
with open(csv_file_path, mode="w", newline="", encoding="utf-8-sig") as file:
    writer = csv.writer(file)
    writer.writerow(["URL_detail"])  
    for url in all_urls:
        writer.writerow([url])

driver.quit()
