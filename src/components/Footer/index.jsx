import React from "react";
import styles from "./style.module.css";
import { IoCallOutline, IoSendSharp } from "react-icons/io5";
import { MdOutlineFacebook } from "react-icons/md";
import { ImYoutube2 } from "react-icons/im";
import { Button } from "antd";

function Footer() {
    return (
        <div className={styles.container}>
            <ul className={styles["content-list"]}>
                <li className={[styles["content-item"], styles['content-item--about']].join(' ')}>
                    <h4 className={styles["content-title"]}>TheMeal</h4>
                    <p className={styles["content-description"]}>
                        TheMeal là Mạng lưới nhà hàng NGON, uy tín và chất lượng. Giúp thực khách đặt bàn dễ dàng, được
                        tặng kèm ưu đãi mà không cần mua Deal, Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở
                        đâu!
                    </p>
                </li>
                <li className={styles["content-item"]}>
                    <h4 className={styles["content-title"]}>Về chúng tôi</h4>
                    <ul className={styles["sub-content"]}>
                        <li className={styles["sub-content__item"]}>
                            Về TheMeal Những điều thú vị về App TheMeal – Có thể bạn chưa biết!
                        </li>
                        <li className={styles["sub-content__item"]}>Hướng dẫn đặt bàn</li>
                        <li className={styles["sub-content__item"]}>Chính sách bảo mật</li>
                    </ul>
                </li>
                <li className={styles["content-item"]}>
                    <h4 className={styles["content-title"]}>Tương tác</h4>
                    <ul className={styles["sub-content"]}>
                        <li className={styles["sub-content__item"]}>Khiếu nại</li>
                        <li className={styles["sub-content__item"]}>Câu hỏi thường gặp</li>
                        <li className={styles["sub-content__item"]}>Dành cho nhà hàng</li>
                        <li className={styles["sub-content__item"]}>Tin tức</li>
                    </ul>
                </li>
                <li className={styles["content-item"]}>
                    <h4 className={styles["content-title"]}>Hotline</h4>
                    <div className={styles["sub-content__item"]}>
                        <IoCallOutline size={22} />
                        <p className={styles.hotline}>19006055</p>
                    </div>
                </li>
                <li className={styles["content-item"]}>
                    <h4 className={styles["content-title"]}>Kết nối</h4>
                    <div>
                        <MdOutlineFacebook style={{color:"#00665c", marginRight:"8px"}} size={36}/>
                        <ImYoutube2 style={{color:"#00665c"}} size={36}/>
                    </div>
                </li>
            </ul>
            <div className={styles["footer-body"]}>
                <div className={styles["footer-company"]}>
                    <h3 className={styles["company-name"]}>CÔNG TY CỔ PHẦN THEMEAL</h3>
                    <p className={styles["company-info"]}>
                        Văn phòng Hà Nội: Tầng 2 tòa nhà VTC Online, Số 18 Tam Trinh, Q. Hai Bà Trưng, ​​Hà Nội
                    </p>
                    <p className={styles["company-info"]}>
                        Văn Phòng TP.HCM: Lầu 13, Tòa nhà M-H, Số 728-730 Võ Văn Kiệt, P.1, Quận 5, TP Hồ Chí Minh{" "}
                    </p>
                    <p className={styles["company-info"]}>Tổng đài: 1900 6005 | Email: CSKH@themeal.vn </p>
                    <p className={styles["company-info"]}>
                        Mã số doanh nghiệp: 0106329042 do Sở Kế hoạch đầu tư TP Hà Nội cấp ngày 08/10/2023{" "}
                    </p>
                    <p className={styles["company-info"]}>
                        Mọi ý tưởng, đóng góp của bạn đều được chúng tôi ghi nhận và trân trọng!{" "}
                    </p>
                    <Button
                        type="primary"
                        icon={<IoSendSharp />}
                        style={{ backgroundColor: "#00665c" }}
                    >
                        Gửi góp ý
                    </Button>
                </div>
                <div className={styles["footer-sponsor"]}>
                    <img
                        src={require("../../assets/images/sponsor_logo.png")}
                        alt="sponsor"
                    ></img>
                    <p className={styles.copyright}>Copyright © 2024 TheMeal.com™. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
