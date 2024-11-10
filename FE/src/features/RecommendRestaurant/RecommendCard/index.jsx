import React from "react";
import styles from "./style.module.css";
import DiscountCard from "../DiscountCard";
import { Rate } from "antd";

function RecommendCard({ imgUrl, address, tags, name, point, category, avgPrice, discountPercent }) {
    return (
        <div className={styles.container}>
            <img
                src={imgUrl}
                alt="Restaurant view"
                className={styles["card-img"]}
            ></img>

            <div className={styles.body}>
                <ul className={styles.tags}>
                    <li className={styles.address}>{address}</li>
                    {tags.map((tag) => (
                        <li className={styles.tag}>{tag}</li>
                    ))}
                </ul>
                <div className={styles['body-card-wrapper']}>
                    <div  className={styles['body-card-wrapper__content']}>
                        <div className={styles["res-title"]}>
                            <h3 className={styles["res-name"]}>{name}</h3>
                        </div>
                        <span className={styles["rating-point"]}>
                            <Rate
                                disabled
                                style={{ fontSize: "14px" }}
                                allowHalf
                                defaultValue={2.5}
                                value={point}
                            />
                        </span>
                        <p className={styles.categories}>{category}</p>
                        <div className={styles.price}>
                            <p className={styles["price-title"]}>Giá trung bình:</p>
                            <span className={styles["avg-price"]}>{`${avgPrice}đ`}</span>
                        </div>
                    </div>
                    <div  className={styles['body-card-wrapper__action']}>
                        <DiscountCard percent={discountPercent} />
                        <div className={styles["booking"]}>
                            <a href="https://thefork.com">ĐẶT BÀN NGAY</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecommendCard;
