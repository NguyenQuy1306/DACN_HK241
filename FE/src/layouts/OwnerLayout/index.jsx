import styles from "./OwnerLayout.module.css";
import OwnerHeader from "../../components/OwnerHeader";
import SidebarOwner from "../../components/SidebarOwner";

function OwnerLayout({ children }) {
    return (
        <div className={styles.container}>
            {/* Sidebar bên trái */}
          
                <SidebarOwner />


            {/* Phần chính */}
            <div className={styles.mainContent}>
                {/* Header */}
                <div className={styles.header}>
                    <OwnerHeader />
                </div>

                {/* Nội dung trang */}
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}

export default OwnerLayout;
