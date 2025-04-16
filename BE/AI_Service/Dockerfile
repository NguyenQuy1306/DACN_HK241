FROM python:3.8-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ nội dung thư mục AI_Service (nơi chứa Dockerfile) vào /app trong container
COPY . /app

# Cài đặt dependencies
RUN pip install -r requirements.txt

# Tạo thư mục logs nếu cần
RUN mkdir -p /app/logs

EXPOSE 5000

CMD ["python", "-m", "app.app"]

