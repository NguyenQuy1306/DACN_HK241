import React from 'react';
import styles from './style.module.css'

function Input({label, type}) {
    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <input className={styles['input-field']} type={type}></input>
        </div>
    );
}

export default Input;