import OwnerHeader from "../../components/OwnerHeader";
import styles from "./OwnerLayout.module.css";

import Footer from "../../components/Footer";
import SidebarOwner from "../../components/SidebarOwner";

function OwnerLayout({ children, title }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <OwnerHeader title={title} />
            </div>

            <div className={styles.mainContent}>
                <SidebarOwner />

                <div className={styles.content}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default OwnerLayout;
