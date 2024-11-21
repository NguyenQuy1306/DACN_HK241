import { Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import styles from "./style.module.css";

function BookingHistory({ customerId }) {
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/orders/customer/${customerId}/history`,{ withCredentials: true});
                if (response.status === 200) {
                    setHistoryList(response.data);
                } else {
                    console.error("Failed to get order list!");
                }
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchOrderList();
    }, [customerId]);
    const totalItem = historyList.length;
    const totalCommingItems = historyList.filter((item) => item.trangThai === "Confirmed").length;
    const totalCancelItems = historyList.filter((item) => item.trangThai === "Cancelled").length;
    const totalDonnedItems = historyList.filter((item) => item.trangThai === "Completed").length;

    useEffect(() => {
        console.log(historyList);
    }, [historyList]);
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Lịch sử đặt bàn</h3>
            <p className={styles.quantity}>({totalItem}) đơn đặt bàn</p>
            <Divider />
            <ul className={styles["status-list"]}>
                <li className={styles["status-item"]}>Tất cả ({totalItem})</li>
                <li className={styles["status-item"]}>Sắp đếm ({totalCommingItems})</li>
                <li className={styles["status-item"]}>Hoàn thành và hủy ({totalCancelItems + totalDonnedItems})</li>
            </ul>
            <p className={styles["list-title"]}>Sắp đến ({totalCommingItems})</p>
            {historyList
                .filter((card) => card.trangThai === "Confirmed")
                .map((his, index) => {
                    return (
                        <HistoryCard
                            key={index}
                            imgUrl={his.anhNhaHang}
                            name={his.tenNhaHang}
                            address={his.diaChiNhaHang}
                            status={his.trangThai}
                            time={his.gio}
                            date={his.ngay}
                            numOfCustomers={his.soKhach}
                            payment={his.tenPhuongThucThanhToan}
                        />
                    );
                })}

            <p className={styles["list-title"]}>Hoàn thành và hủy ({totalCancelItems + totalDonnedItems})</p>
            {historyList
                .filter((card) => card.trangThai === "Cancelled" || card.trangThai === "Completed")
                .map((his, index) => {
                    return (
                        <HistoryCard
                            key={index}
                            imgUrl={his.anhNhaHang}
                            name={his.tenNhaHang}
                            address={his.diaChiNhaHang}
                            status={his.trangThai}
                            time={his.gio}
                            date={his.ngay}
                            numOfCustomers={his.soKhach}
                            payment={his.tenPhuongThucThanhToan}
                        />
                    );
                })}
        </div>
    );
}

export default BookingHistory;
