import React from "react";
import styles from "./style.module.css";

function StatisticCard({ img, title, quantity }) {
    return (
        <div className={styles.container}>
            <div className={styles["img-wrapper"]}>
                <img
                    src={img}
                    alt="Menu"
                ></img>
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.quantity}>{quantity}</p>
            </div>
        </div>
    );
}

export default StatisticCard;
