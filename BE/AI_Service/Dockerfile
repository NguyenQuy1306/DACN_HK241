FROM python:3.8-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy riêng requirements.txt trước
COPY requirements.txt .

# Cài dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ source code sau
COPY . .

# Tạo thư mục logs nếu cần
RUN mkdir -p /app/logs

EXPOSE 5000

# Chạy app
CMD ["python", "-m", "app.app"]
