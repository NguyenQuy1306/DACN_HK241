import React from "react";
import styles from "./style.module.css";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { Rate } from "antd";

function FavoriteCardDetail({ name, address, avgPrice,imgUrl }) {
    return (
        <div className={styles.container}>
            <img
                alt="Restaurant"
                src={imgUrl}
                className={styles["card-img"]}
            ></img>
            <div className={styles["card-body"]}>
                <div className={styles["card-body__header"]}>
                    <ul className={styles.tags}>
                        <li className={styles.tag}>XU HƯỚNG</li>
                        <li className={[styles.tag, styles.bbq].join(" ")}>BBQ</li>
                        <li className={[styles.tag, styles.pay].join(" ")}>
                            <img
                                className={styles["pay-icon"]}
                                src={require("../../../assets/images/VNpay.png")}
                                alt="Pay"
                            ></img>
                            <p className={styles["pay-text"]}>PAY</p>
                        </li>
                    </ul>
                    <FcLike
                        style={{ marginBottom: "4px" }}
                        size={32}
                    />
                </div>
                <div className={styles["restaurant-name"]}>
                    <h3 className={styles.name}>{name}</h3>
                </div>

                <div className={styles["restaurant-address"]}>
                    <p className={styles.address}>{address}</p>
                    <div className={styles.comment}>
                        <FaRegComment />
                        <span className={styles["comment-quantity"]}>410</span>
                    </div>
                </div>
                <div className={styles.rating}>
                    <Rate
                        size={16}
                        disabled
                        defaultValue={2}
                    />
                </div>
                <div className={styles["avg-price"]}>Giá trung bình: {avgPrice}</div>
            </div>
        </div>
    );
}

export default FavoriteCardDetail;
