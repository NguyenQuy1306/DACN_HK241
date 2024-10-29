import React from "react";
import styles from "./style.module.css";
import { FcLike } from "react-icons/fc";
import { MdOutlineLock } from "react-icons/md";

function FavoriteCard() {
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
                <h3 className={styles["card-name"]}>Best BBQ in Ha Noi</h3>
                <div className={styles.private}>
                    <MdOutlineLock size={16} />
                    <p className={styles["private__text"]}>Riêng tư</p>

                </div>
                <div className={styles["card-footer"]}>
                    <p className={styles.quantity}>2 nhà hàng</p>
                    <p className={styles["update-time"]}>Cập nhật: 22/09/2024</p>
                </div>
            </div>
        </div>
    );
}

export default FavoriteCard;
