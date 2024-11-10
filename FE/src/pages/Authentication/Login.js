import React, { useState } from "react";
import { Link } from "react-router-dom"; // Nhập Link từ react-router-dom
import axios from "axios"; // Nhập axios để gọi API
import "./Login.css"; // Đường dẫn đến tệp CSS của bạn

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Thêm state để hiển thị thông báo

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API giả để lấy danh sách người dùng
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      // Tìm người dùng với email và mật khẩu khớp
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setMessage("Đăng nhập thành công!");
      } else {
        setMessage("Sai email hoặc mật khẩu.");
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="loginDiv">
      <div className="loginDivH1">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          {/* Vô hiệu hóa ô nhập Tên Đăng Nhập */}
          {/* 
    <div className="input-group">
      <label>Tên Đăng Nhập / Mã Số Sinh Viên:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled
      />
    </div> 
    */}

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mật Khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Đăng Nhập
          </button>
        </form>
        {message && <p>{message}</p>} {/* Hiển thị thông báo nếu có */}
        <div className="footer-links">
          <p>
            <Link to="/reset-password">Quên Mật Khẩu?</Link>
          </p>
          <p>
            <Link to="/change-password">Đổi Mật Khẩu</Link>
          </p>
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </div>
      <div className="loginDivBackground"></div>
    </div>
  );
}
