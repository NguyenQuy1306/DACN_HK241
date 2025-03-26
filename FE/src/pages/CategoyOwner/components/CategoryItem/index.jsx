import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { MdEdit, MdOutlineBakeryDining } from "react-icons/md";
import ActionButton from "../../../../components/ActionButton";
import styles from "./style.module.css";
import { Popconfirm, message } from "antd";
function CategoryItem({ img, name, quantity, minPrice, maxPrice, viewClick, deleteClick, categoryId, editClick }) {
    const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        })
            .format(value)
            .replace("₫", "đ");
    };

    minPrice = formatCurrency(minPrice);
    maxPrice = formatCurrency(maxPrice);

    return (
        <div className={styles.container}>
            <div className={styles["img-wrapper"]}>
                <img
                    className={styles["category-img"]}
                    src={img}
                    alt="Category"
                ></img>
            </div>
            <div className={styles.body}>
                <div className={styles.content}>
                    <h3 className={styles.name}>{name}</h3>
                    <div className={styles["quantity-wrapper"]}>
                        <MdOutlineBakeryDining size={24} />
                        <p className={styles.quantity}>{`${quantity} món`}</p>
                    </div>
                </div>
                <div className={styles.footer}>
                    <p className={styles.price}>{`${minPrice} - ${maxPrice}`}</p>
                    <div className={styles["action-list"]}>
                        <ActionButton
                            icon={
                                <GoEye
                                    color="#01B075"
                                    size={16}
                                />
                            }
                            color="#E9F5EA"
                            type="View"
                            viewClick={viewClick}
                        />
                        <ActionButton
                            icon={
                                <MdEdit
                                    color="#C76741"
                                    size={16}
                                />
                            }
                            color="#F8C9B7"
                            type="Edit"
                            editClick={editClick}
                        />

                        <ActionButton
                            icon={
                                <AiFillDelete
                                    color="#4C95DD"
                                    size={16}
                                />
                            }
                            color="#CDE3F9"
                            type="Delete"
                            deleteClick={deleteClick}
                            categoryId={categoryId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryItem;
