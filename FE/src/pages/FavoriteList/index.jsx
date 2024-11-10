import { CloseOutlined } from "@mui/icons-material";
import { Divider, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBookOutline, IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { TfiComment } from "react-icons/tfi";
import Logo from "../../components/Logo";
import FavoriteCardDetail from "../../features/FavoriteCardList/FavoriteCardDetail";
import HeaderInfo from "../../features/UserInfo/components/HeaderInfo";
import styles from "./style.module.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
function FavoriteList() {
    const location = useLocation();
    const originList = location.state?.card;
    const listId = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    const showDrawer = () => {
        setOpen(true);
        document.body.style.overflow = "hidden";
    };
    const onClose = () => {
        setOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/favorite-restaurants/${listId.id}`);
                if (response.status === 200) {
                    setRestaurants(response.data);
                } else {
                    console.log("Failure!");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurants();
    }, [listId]);

    return (
        <div className={styles.container}>
            <Drawer
                onClose={onClose}
                width={302}
                closeIcon={childrenDrawer ? null : <CloseOutlined />}
                open={open}
                placement="right"
                getContainer={false}
                style={{ backgroundColor: "#F9FAFA", position: "absolute", right: childrenDrawer ? 630 : 0 }}
            >
                <div className="user-info">
                    <img
                        className="user-avatar"
                        alt="User"
                        src={require("../../assets/images/avatar.png")}
                    ></img>
                    <div className="edit-avatar-icon">
                        <FiEdit2 size={20} />
                    </div>
                </div>
                <h3 className="user-name">Nhựt N.</h3>
                <p className="joined-time">Tham gia năm 2024</p>
                <ul className="user-menu">
                    <li
                        onClick={showChildrenDrawer}
                        className="user-menu__item"
                    >
                        <div className="menu-icon">
                            <IoBookOutline size={24} />
                        </div>
                        <p className="menu-text">Lịch sử đặt bàn</p>
                    </li>
                    <li className="user-menu__item">
                        <div className="menu-icon">
                            <IoIosHeartEmpty size={28} />
                        </div>
                        <p className="menu-text">Yêu thích</p>
                    </li>
                    <li className="user-menu__item">
                        <div className="menu-icon">
                            <TfiComment size={24} />
                        </div>
                        <p className="menu-text">Bình luận</p>
                    </li>
                    <li className="user-menu__item">
                        <div className="menu-icon">
                            <CiUser size={28} />
                        </div>
                        <p className="menu-text">Thông tin tài khoản</p>
                    </li>
                    <li className="user-menu__item">
                        <div className="menu-icon">
                            <IoStorefrontOutline size={24} />
                        </div>
                        <p className="menu-text">Đăng ký nhà hàng</p>
                    </li>
                    <li className="user-menu__item">
                        <div className="menu-icon">
                            <MdOutlineLogout size={24} />
                        </div>
                        <p className="menu-text">Đăng xuất</p>
                    </li>
                </ul>
                <Drawer
                    title=<CloseOutlined
                        onClick={onChildrenDrawerClose}
                        size={18}
                        style={{ position: "absolute", cursor: "pointer", right: 24, top: 16, boxShadow: "none" }}
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
                    <FavoriteList />
                </Drawer>
            </Drawer>
            <div className={styles["home-header"]}>
                <Logo></Logo>
                <div
                    style={{ cursor: "pointer" }}
                    onClick={showDrawer}
                >
                    <HeaderInfo
                        userName="Nhựt"
                        avatar={require("../../assets/images/avatar.png")}
                    />
                </div>
            </div>
            <div className={styles["content-wrapper"]}>
                <div className={styles.title}>
                    <FcLike size={32} />
                    <h3 className={styles.name}>{originList.ten}</h3>
                </div>
                <div className={styles["sub-title"]}>
                    <p className={styles.quantity}>{restaurants.length} nhà hàng</p>
                    <p className={styles["update-time"]}>
                        Cập nhật: {format(new Date(originList.thoiGianCapNhat), "dd/MM/yyyy HH:mm:ss")}
                    </p>
                </div>
                <Divider />

                {restaurants.map((res, index) => {
                    return (
                        <div
                            onClick={() => {
                                navigate(`/DetailRestaurant/${res.maSoNhaHang}`);
                            }}
                        >
                            <FavoriteCardDetail
                                key={index}
                                name={res.tenNhaHang}
                                address={res.diaChi}
                                avgPrice={res.khoangGia}
                                imgUrl={res.anhNhaHang}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FavoriteList;
