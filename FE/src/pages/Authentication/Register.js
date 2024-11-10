import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios"; // Import axios

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [school, setSchool] = useState("");
  const [userRole, setUserRole] = useState(""); // State mới cho vai trò người dùng
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra email có đuôi @hcm**.edu.vn
    const emailRegex = /@hcm\w{2}\.edu\.vn$/;
    if (!emailRegex.test(email)) {
      setError("Email phải có đuôi @hcm**.edu.vn.");
      setMessage("");
      return;
    } else {
      setError(""); // Xóa thông báo lỗi khi email đúng định dạng
    }

    if (!validatePassword(password)) {
      setError(
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ in hoa, chữ thường, số và ký hiệu đặc biệt."
      );
      setMessage("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      setMessage("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/users", {
        userRole: userRole,
        name: username,
        email: email,
        password: password,
        universityId:
          school === "Bách Khoa" ? 1 : school === "Khoa Học Tự Nhiên" ? 2 : 3, // Tạm gán giá trị ID cho các trường
      });

      if (response.status === 201) {
        // `201` nghĩa là đã tạo thành công một tài nguyên mới
        setMessage("Đăng ký thành công");
        // navigate("/login"); // Điều hướng đến trang đăng nhập nếu đăng ký thành công
      }
    } catch (err) {
      setError("Đăng ký không thành công. Vui lòng thử lại.");
      console.error("Lỗi khi đăng ký:", err);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Tên Đăng Nhập:</label>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Nhập email trường của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Trường Học:</label>
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          >
            <option value="">Chọn trường</option>
            <option value="Bách Khoa">Bách Khoa</option>
            <option value="Khoa Học Tự Nhiên">Khoa Học Tự Nhiên</option>
            <option value="Xã Hội Nhân Văn">Xã Hội Nhân Văn</option>
          </select>
        </div>
        <div className="input-group">
          <label>Vai Trò Người Dùng:</label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="">Chọn vai trò</option>
            <option value="Nhà Trường">Nhà Trường</option>
            <option value="Địa Phương">Địa Phương</option>
            <option value="Sinh Viên">Sinh Viên</option>
          </select>
        </div>
        <div className="input-group">
          <label>Mật Khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Xác Nhận Mật Khẩu:</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Đăng Ký
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <button onClick={handleBackToLogin} className="back-to-login-button">
        Quay Lại Trang Đăng Nhập
      </button>
    </div>
  );
}

export default Register;
