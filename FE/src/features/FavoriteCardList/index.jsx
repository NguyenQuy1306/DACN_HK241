import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Divider, Modal } from "antd";
import { IoAddCircle } from "react-icons/io5";
import FavoriteCard from "./FavoriteCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FavoriteCardList({ customerId }) {
    
    const navigate = useNavigate();
    const [favoriteList, setFavorites] = useState([]);
    const handleAddNewCard = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/favorite-list/add-new-card/${customerId}`);
            if (response.status === 200) {
                console.log("Success")
                fetchFavoriteList()
            } else {
                console.log("Failed to add new favorite card!");
            }

        } catch (err) {
            console.error(err);
        }

    }

    const fetchFavoriteList = async () => {
        try {
            const favorites = await axios.get(`http://localhost:8080/api/favorite-list/${customerId}`);
            if (favorites.status === 200) {
                setFavorites(favorites.data);
            } else {
                console.log("Failed to get favorites list!");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchFavoriteList();
    }, [customerId]);

    return (
        <div className={styles.container}>
            
            <h3 className={styles.header}>Danh sách nhà hàng yêu thích</h3>
            <p className={styles.quantity}>({favoriteList.length}) danh sách</p>
            <Divider />
            <div className={styles["add-icon"]}>
                <div onClick={handleAddNewCard} className={styles["icon-wrapper"]}>
                    <IoAddCircle size={24} />
                </div>
                <p className={styles["add-text"]}>Tạo danh sách mới</p>
            </div>
            <div className={styles["card-list-wrapper"]}>
                {favoriteList.map((card, index) => {
                    return (
                        <div
                            onClick={() => navigate(`/favorite-list/${card.maSoDanhSachYeuThich}`,{state: {card}})}
                            className={styles["card-list"]}
                            key={index}
                        >
                            <FavoriteCard
                                name={card.ten}
                                quantity={card.soLuongNhaHang}
                                updateTime={card.thoiGianCapNhat}
                                imgUrl = {card.anhNhaHang}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FavoriteCardList;
