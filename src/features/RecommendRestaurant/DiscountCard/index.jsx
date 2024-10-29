import React from "react";
import styles from "./style.module.css";

function DiscountCard({ percent }) {
    return (
        <div className={styles.container}>
            <span className={styles.content}>{`Giảm tới ${percent}%`}</span>
        </div>
    );
}

export default DiscountCard;
