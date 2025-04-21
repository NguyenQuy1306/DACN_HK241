import { Divider } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import HistoryCard from "./HistoryCard";
import styles from "./style.module.css";
import { getOrderHistory } from "../../redux/api";
import formatDate from "./../../helper/formatDate";

function BookingHistory({ customerId }) {
    const [historyList, setHistoryList] = useState([]);
    const [status, setStatus] = useState("all");

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const result = await getOrderHistory({ userId: customerId });
                setHistoryList(result || []);
            } catch (error) {
                console.error("Failed to fetch order history:", error);
            }
        };
        fetchOrderList();
    }, [customerId]);

    const upcomingBookings = useMemo(() => historyList.filter((card) => card.trangThai === "COMPLETED"), [historyList]);
    const completedOrCancelled = useMemo(
        () => historyList.filter((card) => card.trangThai === "Completed" || card.trangThai === "CANCELED"),
        [historyList],
    );

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Lịch sử đặt bàn</h3>
            <p className={styles.quantity}>({historyList.length}) Đơn đặt bàn</p>
            <Divider />
            <ul className={styles["status-list"]}>
                <li
                    onClick={() => setStatus("all")}
                    className={
                        status === "all"
                            ? `${styles["status-item"]} ${styles["status-item--active"]}`
                            : styles["status-item"]
                    }
                >
                    Tất cả ({historyList.length})
                </li>
                <li
                    onClick={() => setStatus("upcoming")}
                    className={
                        status === "upcoming"
                            ? `${styles["status-item"]} ${styles["status-item--active"]}`
                            : styles["status-item"]
                    }
                >
                    Sắp đến ({upcomingBookings.length})
                </li>
                <li
                    onClick={() => setStatus("cancelled")}
                    className={
                        status === "cancelled"
                            ? `${styles["status-item"]} ${styles["status-item--active"]}`
                            : styles["status-item"]
                    }
                >
                    Hoàn thành hoặc hủy ({completedOrCancelled.length})
                </li>
            </ul>

            <p className={styles["list-title"]}>Sắp đến ({upcomingBookings.length})</p>
            {status === "all" &&
                historyList.map((his, index) => (
                    <HistoryCard
                        key={index}
                        imgUrl={his.anhNhaHang}
                        name={his.tenNhaHang}
                        address={his.diaChiNhaHang}
                        latitude={his.kinhDo}
                        longitude={his.viDo}
                        status={his.trangThai}
                        time={his.gio}
                        deposit={his.tienDatCoc}
                        totalPay={his.tongTienThanhToan}
                        date={his.ngay}
                        numOfCustomers={his.soKhach}
                        payment={his.tenPhuongThucThanhToan}
                        bookingTime={his.thoiGianDat}
                    />
                ))}
            {status === "upcoming" &&
                historyList
                    ?.filter((i) => i.trangThai === "COMPLETED")
                    .map((his, index) => (
                        <HistoryCard
                            key={index}
                            imgUrl={his.anhNhaHang}
                            name={his.tenNhaHang}
                            address={his.diaChiNhaHang}
                            status={his.trangThai}
                            bookingTime={his.thoiGianDat}
                            latitude={his.kinhDo}
                            longitude={his.viDo}
                            time={his.gio}
                            deposit={his.tienDatCoc}
                            totalPay={his.tongTienThanhToan}
                            date={his.ngay}
                            numOfCustomers={his.soKhach}
                            payment={his.tenPhuongThucThanhToan}
                        />
                    ))}

            {status === "cancelled" &&
                historyList
                    ?.filter((i) => i.trangThai === "CANCELED")
                    .map((his, index) => (
                        <HistoryCard
                            key={index}
                            imgUrl={his.anhNhaHang}
                            deposit={his.tienDatCoc}
                            totalPay={his.tongTienThanhToan}
                            name={his.tenNhaHang}
                            latitude={his.kinhDo}
                            bookingTime={his.thoiGianDat}
                            longitude={his.viDo}
                            address={his.diaChiNhaHang}
                            status={his.trangThai}
                            time={his.gio}
                            date={his.ngay}
                            numOfCustomers={his.soKhach}
                            payment={his.tenPhuongThucThanhToan}
                        />
                    ))}
        </div>
    );
}

export default BookingHistory;
