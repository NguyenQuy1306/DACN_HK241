import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { Paper } from "@mui/material";
import { GoChevronDown } from "react-icons/go";

function FilterItem({ title, icon, style }) {
    return (
        <div
            style={style}
            className={styles.container}
        >
            <p className={styles.name}>{title}</p>

            <div className={styles.icon}>{icon ? icon : <GoChevronDown />}</div>
        </div>
    );
}

export default FilterItem;
