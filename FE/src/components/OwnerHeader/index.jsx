import React from "react";
import styles from "./style.module.css";
import logo from "../../assets/images/logo.png";
import { IoHomeSharp, IoNotifications } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import avatar from "../../assets/images/avatar.png";

import HeaderInfo from "../../features/UserInfo/components/HeaderInfo";
import Authentication from "../../features/Authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setStatusModalAuthentication } from "../../redux/features/authenticationSlice";
import ButtonLogin from "../Button/ButtonLogin/ButtonLogin";
import { useNavigate } from "react-router-dom";
function OwnerHeader({ title }) {
    const open = useSelector((state) => state.authentication.openModal);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showDrawer = () => {
        dispatch(setStatusModalAuthentication({ openModal: true }));
        // document.body.style.overflow = "hidden";
    };
    const user = useSelector((state) => state.authentication.user);
    return (
        <div className={styles.container}>
            <div
                onClick={() => navigate("/owner/dashboard")}
                className={styles.logo}
            >
                <img
                    className={styles["logo-img"]}
                    src={logo}
                    alt="Logo"
                ></img>
                <p className={styles.title}>{title}</p>
            </div>
            <p
                className={styles.welcome}
            >{`Xin chào ${user.hoTen}, hãy tiếp tục theo dõi và quản lý nhà hàng của bạn!`}</p>
            <div className={styles.notifications}>
                <IoHomeSharp
                    color="#1c451c"
                    size={24}
                />
                <IoNotifications
                    color="#1c451c"
                    size={24}
                />
                <IoSettingsSharp
                    color="#1c451c"
                    size={24}
                />
                {/* <img

                    className={styles.avt}
                    alt="Owner's avatar"
                    src={avatar}
                ></img> */}
                {user ? (
                    <div
                        onClick={showDrawer}
                        style={{
                            cursor: "pointer",
                            // position: "absolute",
                            right: 0,
                            paddingRight: "5px",
                            // marginLeft: "15px",
                        }}
                    >
                        <HeaderInfo
                            userName={user ? user.hoTen : ""}
                            avatar={avatar}
                        />
                    </div>
                ) : (
                    <ButtonLogin
                        text={"Đăng nhập"}
                        onClick={() => dispatch(setStatusModalAuthentication({ openModal: true }))}
                    ></ButtonLogin>
                )}
                <Authentication open={open}></Authentication>
            </div>
        </div>
    );
}

export default OwnerHeader;
