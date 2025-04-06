import React from "react";
import styles from "./style.module.css";
import { Image } from "antd";
import LineUp from "../../../../assets/images/Line_up.png";
import LineDown from "../../../../assets/images/Line_down.png";

const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    })
        .format(value)
        .replace("₫", "đ");
};
function TrendingItem({ rank, name, price, quantity, url }) {
    return (
        <div className={styles.container}>
            <div className={styles["trending-info"]}>
                <div className={styles.order}>#{rank}</div>
                <Image
                    width={92}
                    height={62}
                    style={{ borderRadius: "8px" }}
                    src={
                        url
                            ? `https:/themealbucket1.s3.amazonaws.com/${url}`
                            : "https://kenh14cdn.com/2017/10-crop-1509403824788.jpg"
                    }
                />
                <div className={styles.product}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.price}>{formatCurrency(price)}</p>
                </div>
            </div>
            <div className={styles["rate-wrap"]}>
                <img
                    src={LineUp}
                    alt="up"
                ></img>
                <div>
                    <h3 className={styles.quantity}>
                        {quantity} <span>phần</span>
                    </h3>
                    <p className={styles.rate}>Tăng 20%</p>
                </div>
            </div>
        </div>
    );
}

export default TrendingItem;
