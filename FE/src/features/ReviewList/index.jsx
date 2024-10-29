import { Divider } from "antd";
import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import styles from "./style.module.css";
import ReviewModal from "./ReviewModal";

function ReviewList() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleCancel = () => {
        setOpen(false);
    };
    const handleOk = () => {
        setOpen(false);
    };
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Danh sách đánh giá nhà hàng</h3>
            <p className={styles.quantity}>(1) đánh giá</p>
            <Divider />

            <ReviewModal
                open={open}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />

            <div
                onClick={() => setOpen(true)}
                className={styles["card-list"]}
            >
                <div className={styles['card-wrapper']}>
                    <ReviewCard />
                </div>
                
            </div>
        </div>
    );
}

export default ReviewList;
