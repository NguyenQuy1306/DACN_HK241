import React from "react";
import styles from "./style.module.css";

function CategoryItem({ imgUrl, name }) {
    return (
        <div className={styles.container}>
            <img
                alt="category item"
                src={imgUrl}
                className={styles["item-image"]}
            ></img>
            <p className={styles["item-name"]}>{name}</p>
        </div>
    );
}

export default CategoryItem;
