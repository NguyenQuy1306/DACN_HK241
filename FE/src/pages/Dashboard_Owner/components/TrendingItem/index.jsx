import React from "react";
import styles from "./style.module.css";
import { Image } from "antd";
import LineUp from "../../../../assets/images/Line_up.png";
import LineDown from "../../../../assets/images/Line_down.png";
function TrendingItem() {
    return (
        <div className={styles.container}>
            <div className={styles['trending-info']}>
                <div className={styles.order}>#1</div>
                <Image
                    width={92}
                    height={62}
                    style={{ borderRadius: "8px" }}
                    src="https://tieccaocap.vn/upload/images/B%C3%9AN%20%C4%90%E1%BA%ACU%20M%E1%BA%AEM%20T%C3%94M.jpg"
                />
                <div className={styles.product}>
                    <h2 className={styles.name}>Bún đậu mắm tôm</h2>
                    <p className={styles.price}>50.000đ</p>
                </div>
            </div>
            <div className={styles["rate-wrap"]}>
                <img
                    src={LineUp}
                    alt="up"
                ></img>
                <div>
                    <h3 className={styles.quantity}>
                        168 <span>phần</span>
                    </h3>
                    <p className={styles.rate}>Tăng 20%</p>
                </div>
            </div>
        </div>
    );
}

export default TrendingItem;
