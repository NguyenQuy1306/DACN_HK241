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
} from "../../redux/features/authenticationSlice";
import { Button } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "./Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login({ setLogin, setRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSessionCheck, setIsSessionCheck] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    dispatch(clearLoglin());
    e.preventDefault();
    setMessage(""); // Reset the message
    setIsSessionCheck(false); // Indicate manual login
    dispatch(login({ email, matKhau: password }));
  };

  useEffect(() => {
    // Check session on initial load
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (isSessionCheck) {
        setLogin(false);
        setRegister(false);
      } else {
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        setLogin(false);
        setRegister(false);
      }
    }
  }, [user, isSessionCheck, setLogin, setRegister]);

  useEffect(() => {
    if (error) {
      setMessage(error); // Display error message
      dispatch(clearError()); // Reset error after displaying
    }
  }, [error, dispatch]);

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
