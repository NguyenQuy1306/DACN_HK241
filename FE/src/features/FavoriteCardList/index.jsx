import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Divider, message, Modal } from "antd";
import { IoAddCircle } from "react-icons/io5";
import FavoriteCard from "./FavoriteCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addNewList, deleteFavoriteList, getList, updateFavoriteList } from "../../redux/api";

function FavoriteCardList({ customerId }) {
    const navigate = useNavigate();
    const [favoriteList, setFavorites] = useState([]);

    const handleAddNewCard = async () => {
        try {
            const response = await addNewList({ userId: customerId });
            message.success("Tạo danh sách yêu thích thành công!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCard = async (listId) => {
        try {
            const response = await deleteFavoriteList({ listId: listId });
            message.success("Xóa danh sách yêu thích thành công!");
            fetchFavoriteList();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateCard = async (listId, listName) => {
        try {
            const response = await updateFavoriteList({ listId, listName });

            message.success("Cập nhật danh sách yêu thích thành công!");
            fetchFavoriteList();
        } catch (err) {
            console.error(err);
        }
    };
    const fetchFavoriteList = async () => {
        try {
            const favorites = await getList({ userId: customerId });

            setFavorites(favorites);
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
                <div
                    onClick={handleAddNewCard}
                    className={styles["icon-wrapper"]}
                >
                    <IoAddCircle size={24} />
                </div>
                <p className={styles["add-text"]}>Tạo danh sách mới</p>
            </div>
            <div className={styles["card-list-wrapper"]}>
                {favoriteList.map((card, index) => {
                    return (
                        <div
                            onClick={() => navigate(`/favorite-list/${card.maSoDanhSachYeuThich}`, { state: { card } })}
                            className={styles["card-list"]}
                            key={index}
                        >
                            <FavoriteCard
                                name={card.ten}
                                quantity={card.soLuongNhaHang}
                                updateTime={card.thoiGianCapNhat}
                                imgUrl={card.anhNhaHang}
                                listId={card.maSoDanhSachYeuThich}
                                handleUpdateFavoriteListName={(id, name) => handleUpdateCard(id, name)}
                                handleDeleteFavoriteList={(id) => handleDeleteCard(id)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FavoriteCardList;
