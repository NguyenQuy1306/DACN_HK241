import React from "react";
import styles from "./style.module.css";
import { Divider } from "antd";
import { IoAddCircle } from "react-icons/io5";
import FavoriteCard from "./FavoriteCard";
import { useNavigate } from "react-router-dom";

function FavoriteCardList() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Danh sách nhà hàng yêu thích</h3>
            <p className={styles.quantity}>(1) danh sách</p>
            <Divider />
            <div className={styles["add-icon"]}>
                <div className={styles["icon-wrapper"]}>
                    <IoAddCircle size={24} />
                </div>
                <p className={styles["add-text"]}>Tạo danh sách mới</p>
            </div>
            <div
                onClick={() => navigate("../favorite-list")}
                className={styles["card-list"]}
            >
                <FavoriteCard />
            </div>
        </div>
    );
}

export default FavoriteCardList;
