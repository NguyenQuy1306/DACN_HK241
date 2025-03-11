import React from "react";
import styles from "./style.module.css";

function Input({ 
    label, 
    type = "text", 
    placeholder, 
    labelColor = "black", 
    otherStyle, 
    value, 
    onChange, 
    options = [], // Danh sách option cho dropdown
    max, 
    min, 
    step 
}) {
    return (
        <div className={styles.container}>
            <p className={styles.label} style={{ color: labelColor }}>
                {label}
            </p>

            {type === "select" ? (
                <select
                    style={{ ...otherStyle }}
                    className={styles["input-field"]}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.ten}>
                            {option.ten}
                        </option>
                    ))}
                </select>
            ) : type === "number" ? (
                <input
                    style={{ ...otherStyle }}
                    placeholder={placeholder}
                    className={styles["input-field"]}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    max={max}
                    min={min}
                    step={step}
                />
            ) : type === "textarea" ? (
                <textarea
                    style={{ 
                        ...otherStyle, 
                        resize: "none", 
                        textAlign: "left",
                        padding: "10px"
                    }}
                    placeholder={placeholder}
                    className={styles["input-field"]}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    style={{ ...otherStyle }}
                    placeholder={placeholder}
                    className={styles["input-field"]}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
}

export default Input;
