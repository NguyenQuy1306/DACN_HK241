import React from "react";
import styles from "./style.module.css";
import ActionButton from "../../../../components/ActionButton";
import { GoEye } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { IoDuplicate } from "react-icons/io5";

function MenuItem({ menuName, category, img, viewClick, deleteClick, duplicateClick }) {
    return (
        <div className={styles.container}>
            <div className={styles["img-container"]}>
                <img
                    src={img}
                    alt="Food"
                    className={styles['food-img']}
                ></img>
            </div>
            <div className={styles.title}>
                <h2 className={styles.name}>{menuName}</h2>

                <p className={styles.category}>{category}</p>
            </div>
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
                {/* <ActionButton
                    icon={
                        <MdEdit
                            color="#C76741"
                            size={16}
                        />
                    }
                    color="#F8C9B7"
                    type="Edit"
                /> */}
                <div className={styles.ml15}>
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
                        isMenuItem={true}
                    />
                </div>
                <ActionButton
                    icon={
                        <IoDuplicate
                            color="#634FD2"
                            size={16}
                        />
                    }
                    color="#E3DEFE"
                    type="Duplicate"
                    duplicateClick={duplicateClick}
                />
            </div>
        </div>
    );
}

export default MenuItem;
