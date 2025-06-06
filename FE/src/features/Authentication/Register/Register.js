import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios"; // Import axios
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  clearRegisterStatus,
} from "../../../redux/features/authenticationSlice";
import { toast } from "react-toastify";

function Register({ setModalType, setIsClickLogout }) {
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState(""); // State mới cho vai trò người dùng
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hoTen, setHoten] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    return passwordRegex.test(password);
  };
  const registerStatus = useSelector(
    (state) => state.authentication.registerStatus
  );

  const handleRegister = async (e) => {
    dispatch(clearRegisterStatus());
    e.preventDefault();

    // Kiểm tra email có đuôi @hcm**.edu.vn
    const emailRegex = /@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Email phải có đuôi @gmail**");
      setMessage("");
      return;
    } else {
      setError(""); // Xóa thông báo lỗi khi email đúng định dạng
    }

    if (!validatePassword(password)) {
      setError(
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ in hoa, chữ thường và chữ số."
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
      dispatch(
        register({
          userRole: userRole,
          email: email,
          matKhau: password,
          hoTen: hoTen,
          sdt: sdt,
        })
      );

      // if (response.status === 201) {
      //   // `201` nghĩa là đã tạo thành công một tài nguyên mới
      //   setMessage("Đăng ký thành công");

      // }
      navigate("../Home");
      setModalType("login");
      setIsClickLogout(false);
      toast.success("Đăng ký tài khoản thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      setError("Đăng ký không thành công. Vui lòng thử lại.");
      console.error("Lỗi khi đăng ký:", err);
    }
  };

  const handleBackToLogin = () => {
    setModalType("login");
  };
  const [showPassword, setShowPassword] = useState(false);
  // useEffect(() => {
  //   if (registerStatus == "SUCCESS") {
  //     toast.success("Đăng ký tài khoản thành công", {
  //       position: "top-right",
  //       autoClose: 3000, // Time in milliseconds
  //       hideProgressBar: false,
  //     });
  //     dispatch(clearRegisterStatus());
  //     setModalType("login");
  //   }
  // });
  return (
    <div className="register-container">
      <div className="registerDiv">
        <h2>Đăng Ký Tài Khoản</h2>
        <form onSubmit={handleRegister}>
          <div className="register-input-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="full-name">Họ và tên:</label>
            <input
              id="full-name"
              type="text"
              placeholder="Nhập họ và tên"
              value={hoTen}
              onChange={(e) => setHoten(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <label>Vai Trò Người Dùng:</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="C">Khách hàng</option>
              <option value="O">Chủ nhà hàng</option>
              <option value="A">Admin</option>
            </select>
          </div>
          <label htmlFor="password" className="login-label-password">
            Mật khẩu:
          </label>
          <div
            className="input-group"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              id="password"
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

          <div className="register-input-group">
            <label htmlFor="confirm-password">Xác Nhận Mật Khẩu:</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="register-button">
            Đăng Ký
          </Button>

          <p>
            Bạn đã có tài khoản ?{" "}
            <Button onClick={handleBackToLogin} className="login-button-other">
              Đăng nhập
            </Button>
          </p>
        </form>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
