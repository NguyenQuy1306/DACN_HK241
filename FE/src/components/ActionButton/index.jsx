import React from "react";
import styles from "./style.module.css";

function ActionButton({ icon, color, type, viewClick, deleteClick, duplicateClick }) {
    const callback = type === "View" ? viewClick : type === "Delete" ? deleteClick : duplicateClick;
    return (
        <div
            onClick={callback}
            className={styles.container}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: color,
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                }}
            >
                {icon}
            </div>
            <p className={styles.type}>{type}</p>
        </div>
    );
}

export default ActionButton;
