import React from "react";
import styles from "./style.module.css";
import Food from "../../../../assets/images/food.png";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";
function Statistic({ img, quantity, title, up, rate, compare }) {
    return (
        <div className={styles.container}>
            <img
                style={{ width: "70px", height: "70px" }}
                src={img}
                alt="Food"
            ></img>
            <div>
                <div>
                    <p className={styles.title}>{title}</p>
                    <b className={styles.quantity}>{quantity}</b>
                </div>
                <div className={styles["grow-up-info"]}>
                    {up && rate && (
                        <FaCircleArrowUp
                            color="#00665C"
                            size={20}
                        />
                    )}
                    {!up && rate && (
                        <FaArrowCircleDown
                            color="red"
                            size={20}
                        />
                    )}

                    {rate && <p className={styles.rate}>{rate}%</p>}
                    <p className={styles.compare}>{compare}</p>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
