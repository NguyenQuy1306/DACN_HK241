import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import styles from "./style.module.css";
function CommentCard() {
    return (
        <div className={styles.container}>
            <div className={styles["comment-header"]}>
                <Avatar
                    size={64}
                    icon={<UserOutlined />}
                />
                <div>
                    <h2 className={styles["user-name"]}>Nguyễn Quốc Nhựt</h2>
                    <p className={styles["time"]}>2 ngày trước</p>
                </div>
                <p>9/10</p>
            </div>
            

            <div className={styles["comment-body"]}>Ngon lắm, nhiều món đa dạng, đồ tươi, giá bình dân</div>
        </div>
    );
}

export default CommentCard;
