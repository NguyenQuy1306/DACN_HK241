import React from "react";
import styles from "./style.module.css";
import Logo from "../../components/Logo";
import { FaCheck, FaChevronLeft } from "react-icons/fa";
import { Button } from "antd";
import Input from "../../components/Input";
import { CiCircleQuestion, CiSearch } from "react-icons/ci";
import { BsTools } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function RegisterRestaurant2() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Logo></Logo>
                <ul className={styles.progress}>
                    <li className={styles["progress-item"]}>
                        <div className={styles["progress-icon"]}>
                            <FaCheck />
                        </div>
                        <p className={styles["progress-title"]}>Thông tin cá nhân</p>
                    </li>
                    <li className={[styles.separator, styles["progress-item"]].join(" ")}></li>
                    <li className={styles["progress-item"]}>
                        <div className={styles["progress-icon"]}>2</div>
                        <p className={styles["progress-title"]}>Thông tin nhà hàng</p>
                    </li>
                </ul>
                <Button
                    style={{ border: "1px solid #000" }}
                    className={styles["login-btn"]}
                >
                    Đăng nhập
                </Button>
            </div>
            <div className={styles.body}>
                <div className={styles["restaurant-info"]}>
                    <h3 className={styles["restaurant-info__title"]}>Nhà hàng của bạn</h3>
                    <div className={styles["input-wrapper"]}>
                        <Input
                            label="Chia sẻ thêm thông tin chi tiết về nhà hàng của bạn. Thông tin này sẽ giúp các chuyên gia của chúng tôi đánh giá nhu cầu và thách thức của bạn."
                            type="text"
                            placeholder="Đầu tiên, tên nhà hàng của bạn là gì?"
                            labelColor="#000"
                            otherStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <Input
                            label="Địa chỉ?"
                            type="text"
                            placeholder="268, Lý Thường Kiệt,..."
                            labelColor="black"
                            otherStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <Input
                            label="Số tiền trung bình cho 1 khách hàng là bao nhiêu (VND)?"
                            type="number"
                            placeholder="200000"
                            labelColor="black"
                            otherStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>
                    <div className={styles["form-action"]}>
                        <div className={styles["back-action"]}>
                            <div className={styles["back-icon"]}>
                                <FaChevronLeft />
                            </div>
                            <p
                                onClick={() => navigate("../register-restaurant")}
                                className={styles["back-btn"]}
                            >
                                Back
                            </p>
                        </div>
                        <Button
                            style={{
                                minWidth: "80px",
                                border: "1px solid #00665C",
                                borderRadius: "8px",
                                color: "#00665C",
                            }}
                        >
                            GỬI
                        </Button>
                    </div>
                </div>

                <div className={styles["bonus-info"]}>
                    <h4 className={styles["bonus-info__title"]}>
                        Mang lại hạnh phúc thông qua những trải nghiệm ẩm thực tuyệt vời
                    </h4>
                    <p className={styles["bonus-info__sub-title"]}>
                        Những thông tin này sẽ giúp các chuyên gia của chúng tôi:
                    </p>
                    <ul className={styles["reason-list"]}>
                        <li className={styles["reason-item"]}>
                            <CiSearch style={{ color: "#00665C" }} />
                            <p className={styles["reason-text"]}>
                                Đánh giá nhu cầu và thách thức của bạn trước khi đăng ký tham gia TheFork
                            </p>
                        </li>
                        <li className={styles["reason-item"]}>
                            <BsTools style={{ color: "#00665C" }} />
                            <p className={styles["reason-text"]}>
                                Gợi ý cho bạn kế hoạch và công cụ phù hợp cho doanh nghiệp của bạn
                            </p>
                        </li>
                        <li className={styles["reason-item"]}>
                            <CiCircleQuestion style={{ color: "#00665C" }} />
                            <p className={styles["reason-text"]}>
                                Hỗ trợ bạn trong quá trình gia nhập và trả lời mọi câu hỏi bạn có thể có
                            </p>
                        </li>
                        <p className={styles.note}>
                            Tài khoản phải được mở bởi người có thẩm quyền ký hợp đồng thay mặt cho doanh nghiệp của
                            bạn. Nếu bạn không có thẩm quyền đó, vui lòng yêu cầu giám đốc điều hành, quản lý cấp cao
                            hoặc giám đốc đăng ký thay.
                        </p>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RegisterRestaurant2;
