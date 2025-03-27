import React from "react";
import { Popconfirm, message } from "antd";
import styles from "./style.module.css";
import { useSelector } from "react-redux";

function ActionButton({
    icon,
    color,
    type,
    viewClick,
    deleteClick,
    duplicateClick,
    categoryId,
    editClick,
    isMenuItem = false,
}) {
    const callback =
        type === "View" ? viewClick : type === "Delete" ? deleteClick : type === "Edit" ? editClick : duplicateClick;

    const categorySlice = useSelector((state) => state.category);
    const findCategory = (categoryId) => {
        return categorySlice.category?.find((category) => category.maSoDanhMuc === categoryId);
    };

    const categoryToDelete = findCategory(categoryId);

    const cancel = (e) => {
        console.log(e);
    };
    const confirm = (e) => {
        if (isMenuItem) {
            callback();
        } else if (categoryToDelete.soLuongMon === 0) {
            callback();
        } else {
            message.error("Không thể xóa danh mục có chứa món ăn!");
        }
    };
    return (
        <div className={styles.container}>
            {type === "Delete" ? (
                <Popconfirm
                    title="Delete the task?"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: color,
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            border: "1px solid",
                            borderColor: "green",
                        }}
                    >
                        {icon}
                    </div>
                </Popconfirm>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: color,
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        border: "1px solid",
                        borderColor: "green",
                    }}
                    onClick={callback}
                >
                    {icon}
                </div>
            )}
            <p className={styles.type}>{type}</p>
        </div>
    );
}

export default ActionButton;
