import styles from "./OwnerLayout.module.css";
import OwnerHeader from "../../components/OwnerHeader";

import SidebarOwner from "../../components/SidebarOwner";
import Header from "../../components/Header/Header";

function OwnerLayout({ children, title }) {
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
        {/* <Header></Header> */}

        {/* Nội dung trang */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default OwnerLayout;
