# syntax=docker/dockerfile:1
FROM eclipse-temurin:23
WORKDIR /app

# Copy file jar từ target vào trong container
COPY target/*.jar /app/app.jar

# Mở cổng ứng dụng (thường là 8080 cho Spring Boot)
EXPOSE 8080

# Chạy ứng dụng Spring Boot khi container được khởi động
ENTRYPOINT ["java", "-jar", "/app/app.jar"]