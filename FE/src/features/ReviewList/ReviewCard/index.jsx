import { Rate } from "antd";
import React, { useState } from "react";
import styles from "./style.module.css";

function ReviewCard({ imgUrl, name, address, updateTime, rating, eatTime }) {




    return (
        <div className={styles.container}>
            <img
                className={styles["card-img"]}
                src={imgUrl}
                alt="Restaurant"
            />
            
            <div className={styles["card-content"]}>
                <div>
                    <div className={styles["card-content__title"]}>
                        <h3 className={styles["card-name"]}>{name}</h3>
                    </div>
                    <p className={styles["address"]}>{address}</p>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={2.5}
                        value={rating}
                    />
                </div>
                <div>
                    <p className={styles["visit-time"]}>Trải nghiệm tại nhà hàng: {eatTime}</p>
                    <p className={styles["review-time"]}>Đánh giá mới nhất: {updateTime}</p>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
