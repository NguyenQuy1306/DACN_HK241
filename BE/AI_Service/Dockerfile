FROM python:3.8-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Cài thêm gcc và build-essential để numpy compile đúng
RUN apt-get update && apt-get install -y gcc build-essential

# Copy requirements.txt trước để tận dụng cache
COPY requirements.txt .

# Cài dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ source code sau khi đã cài thư viện
COPY . .

# Tạo thư mục logs nếu cần
RUN mkdir -p /app/logs

# Expose port Flask app
EXPOSE 5000

# Chạy app
CMD ["python", "-m", "app.main"]
