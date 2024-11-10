import React from "react";

import styles from "./style.module.css";
import { IoCheckmark } from "react-icons/io5";

function PaymentConfirm() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <IoCheckmark
                    size={20}
                    style={{ color: "#fff", backgroundColor: "#002925", borderRadius: "2px" }}
                />
                <p className={styles.pay}>Đã thanh toán</p>
            </div>
        </div>
    );
}

export default PaymentConfirm;
