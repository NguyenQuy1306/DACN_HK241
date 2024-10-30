import React from "react";
import styles from "./style.module.css";

function VNPayButton() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img
                    className={styles['logo-img']}
                    alt="VN-Pay logo"
                    src={require("../../assets/images/VNpay.png")}
                ></img>
                <p className={styles.pay}>Thanh toán trước bằng VN-Pay</p>
            </div>
        </div>
    );
}

export default VNPayButton;
