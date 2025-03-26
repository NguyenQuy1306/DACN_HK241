import React from "react";
import styles from "./style.module.css";
import DiscountCard from "../DiscountCard";
import { Rate } from "antd";
import { motion } from "framer-motion";
import ButtonBooking from "../../../components/Button/ButtonBooking/ButtonBooking";
function RecommendCard({ place,tags,point ,discountPercent}) {
    const handleOnclickToDetail=(id)=>{
        localStorage.setItem("selectedPlace", JSON.stringify(place));
        localStorage.setItem("selectedPlaceId", JSON.stringify(id));
        window.open("/DetailRestaurant/${id}", "_blank");
    }

    return (
        <motion.div className={styles.container} onClick={()=>handleOnclickToDetail(place.maSoNhaHang) }   whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}>
            <img
                src={place.imageUrls["RESTAURANTIMAGE"]? place.imageUrls["RESTAURANTIMAGE"][0]  : "https://placehold.co/400x300"}
                alt="Restaurant view"
                className={styles["card-img"]}
            ></img>

            <div className={styles.body}>
                <ul className={styles.tags}>
                    <li className={styles.address}>{place.diaChi}</li>
                    {tags.map((tag) => (
                        <li className={styles.tag}>{tag}</li>
                    ))}
                </ul>
                <div  className={styles['body-card-wrapper']}>
                    <div  className={styles['body-card-wrapper__content']}>
                        <div className={styles["res-title"]}>
                            <h3 className={styles["res-name"]}>{place.ten}</h3>
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
                        <p className={styles.categories}>{place.loaiHinh}</p>
                        <div className={styles.price}>
                            <p className={styles["price-title"]}>Giá trung bình:</p>
                            <span className={styles["avg-price"]}>{`${place.khoangGia}đ`}</span>
                        </div>
                    </div>
                    <div  className={styles['body-card-wrapper__action']}>
                        <DiscountCard percent={discountPercent} />
                        <div className={styles["booking"]}>
                       <ButtonBooking text={"Đặt bàn ngay"}></ButtonBooking>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default RecommendCard;
