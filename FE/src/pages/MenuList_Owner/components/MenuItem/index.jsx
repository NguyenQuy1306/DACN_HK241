import React from "react";
import styles from "./style.module.css";

function MenuItem({ menuName, category }) {
    return (
        <div className={styles.container}>
            <div className={styles["img-container"]}></div>
            <div className={styles.title}>
                <h2 className={styles.name}>{menuName}</h2>
                <p className={styles.category}>{category}</p>
            </div>
        </div>
    );
}

export default MenuItem;
