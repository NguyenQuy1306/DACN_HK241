import React, { useState } from "react";
import styles from "./style.module.css";
import { FcLike } from "react-icons/fc";
import { MdOutlineLock } from "react-icons/md";
import formatDate from "../../../helper/formatDate";
import { MdDeleteOutline, MdEdit, MdCheck } from "react-icons/md";
import { Input, Modal } from "antd";

function FavoriteCard({
    name,
    listId,
    quantity,
    updateTime,
    handleDeleteFavoriteList,
    handleUpdateFavoriteListName, // thêm callback để cập nhật
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const inputRef = React.useRef(null);
    const { confirm } = Modal;
    const handleEditClick = (event) => {
        setIsEditing(true);
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
        inputRef.current?.focus(); // Tự động focus vào input khi bắt đầu chỉnh sửa
    };

    const handleSaveClick = (e) => {
        if (editedName.trim() && editedName !== name) {
            handleUpdateFavoriteListName(listId, editedName);
        }
        setIsEditing(false);
        e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
        confirm({
            title: "Bạn có chắc muốn xóa danh sách yêu thích này?",
            content: "Hành động này không thể hoàn tác. Bạn sẽ không thể khôi phục lại danh sách này.",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Không",
            onOk() {
                handleDeleteFavoriteList?.({ listId: listId }); // Gọi hàm hủy nếu người dùng đồng ý
            },
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles["card-icon"]}>
                <div className={styles["icon-wrapper"]}>
                    <FcLike
                        style={{ margin: "auto", display: "block" }}
                        size={32}
                    />
                </div>
            </div>

            <div className={styles["card-content"]}>
                <div className={styles["card-name-wrapper"]}>
                    {isEditing ? (
                        <Input
                            ref={inputRef}
                            type="text"
                            value={editedName}
                            onChange={(e) => {
                                e.stopPropagation();
                                setEditedName(e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={styles["name-input"]}
                        />
                    ) : (
                        <h3 className={styles["card-name"]}>{name}</h3>
                    )}
                    {isEditing ? (
                        <MdCheck
                            size={18}
                            className={styles["edit-icon"]}
                            onClick={handleSaveClick}
                            style={{ marginLeft: "8px", cursor: "pointer" }}
                        />
                    ) : (
                        <MdEdit
                            size={18}
                            className={styles["edit-icon"]}
                            onClick={handleEditClick}
                        />
                    )}
                </div>

                <div className={styles.private}>
                    <div className={styles["private-icon"]}>
                        <MdOutlineLock size={16} />
                        <p className={styles["private__text"]}>Riêng tư</p>
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFavoriteList(listId);
                        }}
                        className={styles["delete-icon"]}
                    >
                        <MdDeleteOutline size={18} />
                    </div>
                </div>

                <div className={styles["card-footer"]}>
                    <p className={styles.quantity}>{quantity} nhà hàng</p>
                    <p className={styles["update-time"]}>
                        Cập nhật:{" "}
                        {`${formatDate(updateTime.split(".")[0].split("T")[0])} ${
                            updateTime.split(".")[0].split("T")[1]
                        }`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FavoriteCard;
