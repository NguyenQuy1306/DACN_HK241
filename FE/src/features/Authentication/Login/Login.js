import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  checkSession,
  selectUser,
  selectLoading,
  selectError,
  clearError,
  clearLoglin,
  setStatusModalAuthentication,
  setLoginRoute,
} from "../../../redux/features/authenticationSlice";
import { Button } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import "./Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Import icon Google từ react-icons

export default function Login({
  setModalType,
  setIsClickLogout,
  isCLickLogout,
}) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.authentication.userRole);
  const handleSubmit = async (e) => {
    // dispatch(clearLoglin());
    e.preventDefault();
    setMessage(""); // Reset the message
    setIsClickLogout(false); // Indicate manual login
    dispatch(login({ email, matKhau: password }));
    toast.success("Đăng nhập thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };
  useEffect(() => {
    console.log("afterlogin ", userRole);

    if (user && userRole != "guest") {
      setModalType("checked");
      console.log("after login", userRole);
      // if (userRole === "owner") {
      //   console.log("after login2323");
      //   navigate("../owner/menu/add");
      //   dispatch(setLoginRoute(false));
      // }
      // toast.success("Đăng nhập thành công", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      // });
      setIsClickLogout(false);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setMessage(error); // Display error message
    } else {
      setMessage("");
    }
  }, [error, dispatch]);

  const handleOnClickRegister = () => {
    setModalType("register");
  };
  const handleOnClickLogo = () => {
    navigate(`../Home`);
  };
  const handleOnchangeUsername = (e) => {
    dispatch(clearError());
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    dispatch(clearError());
    setPassword(e.target.value);
  };
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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
              onChange={(e) => handleOnchangeUsername(e)}
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
              onChange={(e) => handleOnchangePassword(e)}
              required
              style={{ paddingRight: "30px" }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "30px",
                cursor: "pointer",
                color: "grey",
              }}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          <Button type="submit" className="login-button">
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </Button>
        </form>
        {message && <p className="login-notify">{message}</p>}
        <div className="google-login" style={{ marginTop: "10px" }}>
          <Button
            variant="outlined"
            startIcon={<FcGoogle />}
            onClick={handleGoogleLogin}
            fullWidth
          >
            Đăng nhập với Google
          </Button>
        </div>
        <div className="footer-links">
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
