import { Divider } from "antd";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { GrDirections, GrSchedule } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import PaymentConfirm from "../../../components/PaymentConfirm";
import VNPayButton from "../../../components/VNPayButton";
import styles from "./style.module.css";
import formatCurrencyVND from "./../../../helper/formatCurrency";
import CountdownTimer from "../../../helper/countDownTime";
import formatDate from "../../../helper/formatDate";
import { cancelOrder } from "../../../redux/api";

const handleOpenGoogleMap = (latitude, longitude) => {
    const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(gmapsUrl, "_blank");
};

function HistoryCard({
    status,
    imgUrl,
    name,
    id,
    address,
    time,
    date,
    numOfCustomers,
    payment,
    totalPay,
    deposit,
    latitude,
    longitude,
    bookingTime,
}) {
    const hanldeCancelOrder = async () => {
        const result = await cancelOrder({ orderId: id });
        console.log(result.data);
    };

    return (
        <div className={styles.container}>
            <div
                className={
                    status === "Confirmed"
                        ? styles["confirm-status"]
                        : status === "COMPLETED"
                        ? styles["complete-status"]
                        : styles["cancel-status"]
                }
            >
                {status}
            </div>
            <div className={styles["card-body"]}>
                <div style={{ textAlign: "center" }}>
                    <img
                        className={styles["card-img"]}
                        alt="History booking"
                        src={imgUrl}
                    ></img>
                    <p className={styles["order-time"]}>
                        Đặt bàn lúc:{" "}
                        {`${formatDate(bookingTime.split(".")[0].split("T")[0])} ${
                            bookingTime.split(".")[0].split("T")[1]
                        }`}
                    </p>
                </div>

                <div className={styles["card-content"]}>
                    <h2 className={styles["restaurant-name"]}>{name}</h2>
                    <p className={styles["restaurant-address"]}>{address}</p>
                    <div className={styles["time-frame"]}>
                        <div className={styles["time-frame__day"]}>
                            <p className={styles["time-frame__title"]}>NGÀY</p>
                            <span className={styles["time-frame__detail"]}>{formatDate(date)}</span>
                        </div>
                        <div className={styles["time-frame__hour"]}>
                            <p className={styles["time-frame__title"]}>THỜI GIAN</p>
                            <span className={styles["time-frame__detail"]}>{time}</span>
                        </div>
                        <div className={styles["time-frame__cus"]}>
                            <p className={styles["time-frame__title"]}>SỐ KHÁCH</p>
                            <span className={styles["time-frame__detail"]}>{numOfCustomers}</span>
                        </div>
                    </div>
                    <Divider style={{ margin: "12px 0" }} />
                    <div className={styles["payment-wrapper"]}>
                        <div className={styles["payment-info"]}>
                            <div style={{ display: "flex", justifyContent: "space-between", minWidth: "200px" }}>
                                <p className={styles["price-title"]}>Tổng hóa đơn:</p>
                                <span className={styles["total-price"]}>{formatCurrencyVND(totalPay)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", minWidth: "200px" }}>
                                <p className={styles["deposit-title"]}>Đã cọc:</p>
                                <span className={styles["deposit-price"]}>{formatCurrencyVND(deposit)}</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", minWidth: "200px" }}>
                                <h4 className={styles["deposit-title"]}>Chờ thanh toán:</h4>
                                <span className={styles["remain-price"]}>{formatCurrencyVND(totalPay - deposit)}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <p className={styles["time-frame__title"]}>Thời gian còn lại</p>
                            <div style={{ marginLeft: "24px" }}>
                                <CountdownTimer
                                    bookingTime={bookingTime}
                                    targetDate={`${date}T${time}`}
                                />
                            </div>
                        </div>
                    </div>

                    {payment === "Thanh toán tại nhà hàng" && (
                        <div className={styles.prepayment}>
                            <VNPayButton />
                        </div>
                    )}
                    {payment === "VN-Pay QR" && (
                        <div className={styles.prepayment}>
                            <PaymentConfirm />
                        </div>
                    )}
                </div>
            </div>

            <div className={styles["card-actions"]}>
                {status === "COMPLETED" && (
                    <div className={styles["card-action"]}>
                        <div className={styles["card-direction"]}>
                            <div className={styles["direction-icon"]}>
                                <GrDirections size={26} />
                            </div>
                            <p
                                onClick={() => handleOpenGoogleMap(latitude, longitude)}
                                className={[styles["action-content"], styles["action-content--direction"]].join(" ")}
                            >
                                ĐƯỜNG ĐI ĐẾN NHÀ HÀNG
                            </p>
                        </div>

                        <div className={styles["card-modify"]}>
                            <div className={styles["modify-icon"]}>
                                <FaRegEdit size={26} />
                            </div>
                            <p className={[styles["action-content"], styles["action-content--modify"]].join(" ")}>
                                CHỈNH SỬA
                            </p>
                        </div>
                        <div className={styles["card-delete"]}>
                            <div className={styles["delete-icon"]}>
                                <MdOutlineDelete size={26} />
                            </div>
                            <p
                                onClick={() => hanldeCancelOrder(id)}
                                className={[styles["action-content"], styles["action-content--delete"]].join(" ")}
                            >
                                HỦY
                            </p>
                        </div>
                    </div>
                )}
                {status !== "COMPLETED" && (
                    <>
                        <div className={styles["card-booking"]}>
                            <div className={styles["booking-icon"]}>
                                <GrSchedule size={26} />
                            </div>
                            <p className={[styles["action-content"], styles["action-content--booking"]].join(" ")}>
                                ĐẶT LẠI
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HistoryCard;
