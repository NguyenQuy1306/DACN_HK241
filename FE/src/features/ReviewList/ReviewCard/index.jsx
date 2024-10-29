import React from "react";
import styles from "./style.module.css";
import { FcLike } from "react-icons/fc";
import { MdOutlineLock } from "react-icons/md";

function ReviewCard() {
    return (
        <div className={styles.container}>
            <img
                className={styles["card-img"]}
                src={require("../../../assets/images/nha-hang-1.jpg")}
                alt="Restaurant"
            />
            <div className={styles["card-content"]}>
                <div className={styles["card-content__title"]}>
                    <h3 className={styles["card-name"]}>Grand Ocean Luxury</h3>
                    <h3 className={styles["card-rating"]}>
                        <span className={styles["rating-point"]}>9</span>/10
                    </h3>
                </div>

                <p className={styles["address"]}>Tầng 1, TTTM Aeon mall Hà Đông, Quận Hà Đông, TP. Hà Nội</p>

                <p className={styles['visit-time']}>Trải nghiệm tại nhà hàng: 12/08/2024</p>
                <p className={styles["review-time"]}>Đánh giá mới nhất: 14/09/2024</p>
            </div>
        </div>
    );
}

export default ReviewCard;
