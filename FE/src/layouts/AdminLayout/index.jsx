import OwnerHeader from "../../components/OwnerHeader";
import styles from "./style.module.css";

import Footer from "../../components/Footer";
import SidebarAdmin from "../../components/SidebarAdmin";
import AdminHeader from "../../components/AdminHeader";

function AdminLayout({ children, title }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <AdminHeader title={title} />
            </div>

            <div className={styles.mainContent}>
                <SidebarAdmin />

                <div className={styles.content}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminLayout;
