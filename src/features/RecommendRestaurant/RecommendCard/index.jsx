import React from "react";
import styles from "./style.module.css";
import DiscountCard from "../DiscountCard";

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
                <div className={styles["res-title"]}>
                    <h3 className={styles["res-name"]}>{name}</h3>
                    <span className={styles["rating-point"]}>{point}</span>
                </div>
                <p className={styles.categories}>{category.join(", ")}</p>
                <div className={styles.price}>
                    <p className={styles["price-title"]}>Giá trung bình:</p>
                    <span className={styles["avg-price"]}>{`${avgPrice}đ`}</span>
                </div>
                <DiscountCard percent={discountPercent} />
                <div className={styles["booking"]}>
                    <a href="https://thefork.com">ĐẶT BÀN NGAY</a>
                </div>
            </div>
        </div>
    );
}

export default RecommendCard;
