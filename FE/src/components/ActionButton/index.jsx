import React from "react";
import styles from "./style.module.css";

function ActionButton({ icon, color, type }) {
    return (
        <div
            style={{ backgroundColor: color }}
            className={styles.container}
        >
            <div>{icon}</div>
            <p className={styles.type}>{type}</p>
        </div>
    );
}

export default ActionButton;
