import { Divider } from "antd";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { GrDirections, GrSchedule } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import PaymentConfirm from "../../../components/PaymentConfirm";
import VNPayButton from "../../../components/VNPayButton";
import styles from "./style.module.css";

function HistoryCard({ status, imgUrl, name, address, time, date, numOfCustomers, payment }) {
    return (
        <div className={styles.container}>
            <div
                className={
                    status === "Confirmed"
                        ? styles["confirm-status"]
                        : status === "Completed"
                        ? styles["complete-status"]
                        : styles["cancel-status"]
                }
            >
                {status}
            </div>
            <div className={styles["card-body"]}>
                <img
                    className={styles["card-img"]}
                    alt="History booking"
                    src={imgUrl}
                ></img>
                <div className={styles["card-content"]}>
                    <h2 className={styles["restaurant-name"]}>{name}</h2>
                    <p className={styles["restaurant-address"]}>{address}</p>
                    <div className={styles["time-frame"]}>
                        <div className={styles["time-frame__day"]}>
                            <p className={styles["time-frame__title"]}>NGÀY</p>
                            <span className={styles["time-frame__detail"]}>{date}</span>
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
                {status === "Confirmed" && (
                    <>
                        <div className={styles["card-delete"]}>
                            <div className={styles["delete-icon"]}>
                                <MdOutlineDelete size={26} />
                            </div>
                            <p className={[styles["action-content"], styles["action-content--delete"]].join(" ")}>
                                XÓA
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
                        <div className={styles["card-direction"]}>
                            <div className={styles["direction-icon"]}>
                                <GrDirections size={26} />
                            </div>
                            <p className={[styles["action-content"], styles["action-content--direction"]].join(" ")}>
                                ĐƯỜNG ĐI ĐẾN NHÀ HÀNG
                            </p>
                        </div>
                    </>
                )}
                {status !== "Confirmed" && (
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
