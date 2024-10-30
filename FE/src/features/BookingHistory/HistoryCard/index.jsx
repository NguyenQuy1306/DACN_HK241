import React from "react";
import styles from "./style.module.css";
import { SiRclone } from "react-icons/si";
import { Divider } from "antd";
import VNPayButton from "../../../components/VNPayButton";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrDirections, GrSchedule } from "react-icons/gr";

function HistoryCard({ status = "confirm" }) {
    return (
        <div className={styles.container}>
            <div className={status === "confirm" ? styles["confirm-status"] : styles["cancel-status"]}>
                {status === "confirm" ? "Đã xác nhận" : "Đã hủy"}
            </div>
            <div className={styles["card-body"]}>
                <img
                    className={styles["card-img"]}
                    alt="History booking"
                    src={require("../../../assets/images/nha-hang-thien-anh-ha-long-3.jpg")}
                ></img>
                <div className={styles["card-content"]}>
                    <h2 className={styles["restaurant-name"]}>Lẩu cua Đất Mũi</h2>
                    <p className={styles["restaurant-address"]}>339/3, Trần Hưng Đạo, Phường 5, TP Cà Mau</p>
                    <div className={styles["time-frame"]}>
                        <div className={styles["time-frame__day"]}>
                            <p className={styles["time-frame__title"]}>NGÀY</p>
                            <span className={styles["time-frame__detail"]}>22/11/2024</span>
                        </div>
                        <div className={styles["time-frame__hour"]}>
                            <p className={styles["time-frame__title"]}>THỜI GIAN</p>
                            <span className={styles["time-frame__detail"]}>11:30</span>
                        </div>
                        <div className={styles["time-frame__cus"]}>
                            <p className={styles["time-frame__title"]}>SỐ KHÁCH</p>
                            <span className={styles["time-frame__detail"]}>7</span>
                        </div>
                    </div>
                    <Divider style={{ margin: "12px 0" }} />
                    <div className={styles.prepayment}>
                        <VNPayButton />
                    </div>
                </div>
            </div>

            <div className={styles["card-actions"]}>
                {status === "confirm" && (
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
                {status !== "confirm" && (
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
