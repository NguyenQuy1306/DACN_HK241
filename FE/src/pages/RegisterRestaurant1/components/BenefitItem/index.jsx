import React from 'react';
import styles from './style.module.css'

function BenefitItem({icon,title, description}) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img className={styles['icon-img']} src={icon} alt='Icon'></img>
            </div>
            <h3 className={styles.title}>
                {title}
            </h3>
            <p className={styles.description}>
                {description}
            </p>
        </div>
    );
}

export default BenefitItem;