import React, { useState } from "react";
import { Link } from "react-router-dom"; // Nhập Link từ react-router-dom
import axios from "axios"; // Nhập axios để gọi API
import "./Login.css"; // Đường dẫn đến tệp CSS của bạn
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authenticationSlice";
export default function Login({ setLogin, setRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Thêm state để hiển thị thông báo
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API giả để lấy danh sách người dùng
      dispatch(login({ email: email, matKhau: password }));

      // Tìm người dùng với email và mật khẩu khớp
      // const user = users.find(
      //   (user) => user.email === email && user.password === password
      // );

      // if (user) {
      //   setMessage("Đăng nhập thành công!");
      // } else {
      //   setMessage("Sai email hoặc mật khẩu.");
      // }
    } catch (error) {
      setMessage("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleOnClickForgotPassword = () => {
    // setLogin(false);
    // setRegister(true);
  };

  const handleOnClickRegister = () => {
    setLogin(false);
    setRegister(true);
  };
  return (
    <div className="loginDiv">
      <div className="loginDivH1">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h2 className="logo__name">TheMeal</h2>
          <img src={logo} alt="TheMeal's logo" className="logo__image" />
        </div>
        <h4>Đăng nhập để tiếp tục</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              className="input-group-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <label className="login-label-password">Mật khẩu:</label>
          <div
            className="input-group"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "30px" }} // Add space for the icon
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "30px",
                cursor: "pointer",
                color: "grey",
                fontSize: "10px !important",
              }}
            >
              {showPassword ? (
                <VisibilityIcon className="input-group-input_VisibilityIcon"></VisibilityIcon>
              ) : (
                <VisibilityOffIcon className="input-group-input_VisibilityIcon"></VisibilityOffIcon>
              )}{" "}
              {/* Replace with your preferred icons */}
            </span>
          </div>
          <Button type="submit" className="login-button">
            Đăng Nhập
          </Button>
        </form>
        {message && <p className="login-notify">{message}</p>}{" "}
        {/* Hiển thị thông báo nếu có */}
        <div className="footer-links">
          <p>
            <Button
              className="login-button-other"
              onClick={handleOnClickForgotPassword}
            >
              Quên Mật Khẩu?
            </Button>
          </p>
          <p>
            <Button className="login-button-other">Đổi Mật Khẩu</Button>
          </p>
          <p>
            Bạn chưa có tài khoản?{" "}
            <Button
              className="login-button-other"
              onClick={handleOnClickRegister}
            >
              Đăng ký
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
