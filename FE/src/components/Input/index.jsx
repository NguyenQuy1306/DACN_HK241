import React from "react";
import styles from "./style.module.css";

function Input({ label, type, placeholder, labelColor = "black", otherStyle }) {
    return (
        <div className={styles.container}>
            <p
                className={styles.label}
                style={{ color: labelColor  }}
            >
                {label}
            </p>
            <input
                style={{ ...otherStyle }}
                placeholder={placeholder}
                className={styles["input-field"]}
                type={type}
            ></input>
        </div>
    );
}

export default Input;
