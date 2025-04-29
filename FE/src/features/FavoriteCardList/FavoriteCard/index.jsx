import React from "react";
import styles from "./style.module.css";
import { FcLike } from "react-icons/fc";
import { MdOutlineLock } from "react-icons/md";
import formatDate from "../../../helper/formatDate";
function FavoriteCard({ name, quantity, updateTime }) {
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
                <h3 className={styles["card-name"]}>{name}</h3>
                <div className={styles.private}>
                    <MdOutlineLock size={16} />
                    <p className={styles["private__text"]}>Riêng tư</p>
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
