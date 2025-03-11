import React, { useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";

function MenuList_Owner() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={styles.container}>
            <SidebarOwner collapsed={collapsed} />
        </div>
    );
}

export default MenuList_Owner;
