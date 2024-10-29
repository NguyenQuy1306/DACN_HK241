import React from "react";
import styles from "./style.module.css";
import { Divider } from "antd";
import HistoryCard from "./HistoryCard";

function BookingHistory() {
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Lịch sử đặt bàn</h3>
            <p className={styles.quantity}>(2) đơn đặt bàn</p>
            <Divider />
            <ul className={styles["status-list"]}>
                <li className={styles["status-item"]}>Tất cả (2)</li>
                <li className={styles["status-item"]}>Sắp đếm (1)</li>
                <li className={styles["status-item"]}>Hoàn thành và hủy (1)</li>
            </ul>
            <p className={styles["list-title"]}>Sắp đến (1)</p>
            <HistoryCard />

            <p className={styles["list-title"]}>Hoàn thành và hủy (1)</p>
            <HistoryCard status="cancel" />
            <HistoryCard status="cancel" />
            <HistoryCard status="cancel" />
            <HistoryCard status="cancel" />
            <HistoryCard status="cancel" />
        </div>
    );
}

export default BookingHistory;
