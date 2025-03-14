import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css"; // Import file CSS module
import notFoundImage from "../../assets/images/notfound.png"; // Thay bằng ảnh phù hợp
import { useSelector } from "react-redux";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.authentication.userRole);
  const handleNavigate = () => {
    if (userRole === "owner") {
      navigate("/owner/menu/add");
    } else if (userRole === "customer") {
      navigate("/Home");
    }
  };
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="Page Not Found" className={styles.image} />
      <h1 className={styles.title}>Oops! Page Not Found</h1>
      <p className={styles.message}>
        Xin lỗi, trang bạn đang tìm không tồn tại hoặc bạn không có quyền truy
        cập.
      </p>
      <button onClick={() => handleNavigate()} className={styles.button}>
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default NotFoundPage;
