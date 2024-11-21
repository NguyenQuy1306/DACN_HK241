import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { CloseOutlined, Draw } from "@mui/icons-material";
import PersonalInfo from "../../../features/PersonalInfo";
import ReviewList from "../../../features/ReviewList";
import BookingHistory from "./../../../features/BookingHistory/index";
import FavoriteList from "../../../features/FavoriteCardList";
import { FiEdit2 } from "react-icons/fi";
import { IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { IoBookOutline, IoStorefrontOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import Login from "../../Authentication/Login";
import Register from "../../Authentication/Register";
import {
  logout,
  selectUser,
  setStatusModalAuthentication,
} from "../../../redux/features/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalHomepage = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const [navItem, setNavItem] = useState("");
  const onClose = () => {
    dispatch(setStatusModalAuthentication({ openModal: false }));
    document.body.style.overflow = "auto";
  };
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [isCLickLogout, setIsClickLogout] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    setIsClickLogout(true);
  };
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isCLickLogout && !user) {
      toast.success("Đăng xuất thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      setLogin(true);
      setRegister(false);
      setIsClickLogout(false);
    }
  }, [user, isCLickLogout, setIsClickLogout]);
  return (
    <>
      {!login && !register && (
        <Drawer
          onClose={onClose}
          width={302}
          closeIcon={childrenDrawer ? null : <CloseOutlined />}
          open={open}
          placement="right"
          style={{
            backgroundColor: "#F9FAFA",
            position: "fixed",
            top: 0,
            right: childrenDrawer ? 630 : 0,
          }}
        >
          <div className="user-info">
            <img
              className="user-avatar"
              alt="User"
              src={require("../../../assets/images/avatar.png")}
            ></img>
            <div className="edit-avatar-icon">
              <FiEdit2 size={20} />
            </div>
          </div>
          <h3 className="user-name">{user ? user.hoTen : "null"}</h3>
          <p className="joined-time">Tham gia năm 2024</p>
          <ul className="user-menu">
            <li onClick={showChildrenDrawer} className="user-menu__item">
              <div className="menu-icon">
                <IoBookOutline size={24} />
              </div>
              <p onClick={() => setNavItem("booking")} className="menu-text">
                Lịch sử đặt bàn
              </p>
            </li>
            <li className="user-menu__item">
              <div className="menu-icon">
                <IoIosHeartEmpty size={28} />
              </div>
              <p onClick={() => setNavItem("favorite")} className="menu-text">
                Yêu thích
              </p>
            </li>
            <li className="user-menu__item">
              <div className="menu-icon">
                <TfiComment size={24} />
              </div>
              <p onClick={() => setNavItem("comment")} className="menu-text">
                Bình luận
              </p>
            </li>
            <li className="user-menu__item">
              <div className="menu-icon">
                <CiUser size={28} />
              </div>
              <p onClick={() => setNavItem("account")} className="menu-text">
                Thông tin tài khoản
              </p>
            </li>
            <li className="user-menu__item">
              <div className="menu-icon">
                <IoStorefrontOutline size={24} />
              </div>
              <p
                onClick={() => navigate("../register-restaurant")}
                className="menu-text"
              >
                Đăng ký nhà hàng
              </p>
            </li>
            <li className="user-menu__item">
              <div className="menu-icon">
                <MdOutlineLogout size={24} />
              </div>
              <p className="menu-text" onClick={handleLogout}>
                Đăng xuất
              </p>
            </li>
          </ul>
          <Drawer
            title=<CloseOutlined
              onClick={onChildrenDrawerClose}
              size={18}
              style={{
                position: "absolute",
                cursor: "pointer",
                right: 24,
                top: 16,
                boxShadow: "none",
              }}
            />
            width={816}
            closable={false}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
            style={{
              backgroundColor: "#FFF",
              boxShadow: "none",
              transition: "right 0.3s ease",
            }}
            mask={false}
          >
            {navItem === "favorite" && <FavoriteList customerId={1} />}
            {navItem === "booking" && <BookingHistory customerId={4} />}
            {navItem === "comment" && <ReviewList />}
            {navItem === "account" && <PersonalInfo />}
          </Drawer>
        </Drawer>
      )}
      {login && !register && (
        <Drawer
          onClose={onClose}
          width={302}
          closeIcon={childrenDrawer ? null : <CloseOutlined />}
          open={open}
          placement="right"
          style={{
            backgroundColor: "#F9FAFA",
            position: "fixed",
            top: 0,
            right: childrenDrawer ? 630 : 0,
          }}
        >
          <Login setLogin={setLogin} setRegister={setRegister}></Login>
        </Drawer>
      )}
      {register && !login && (
        <Drawer
          onClose={onClose}
          width={302}
          closeIcon={childrenDrawer ? null : <CloseOutlined />}
          open={open}
          placement="right"
          style={{
            backgroundColor: "#F9FAFA",
            position: "fixed",
            top: 0,
            right: childrenDrawer ? 630 : 0,
          }}
        >
          <Register setLogin={setLogin} setRegister={setRegister} />
        </Drawer>
      )}
    </>
  );
};

export default ModalHomepage;
