import React from "react";
import styles from "./style.module.css";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { Button } from "antd";

function RegisterRestaurant1() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Logo></Logo>
            </div>
            <div className={styles["head-side"]}>
                <h2 className={styles["head-side__title"]}> Thu hút khách hàng mới đến nhà hàng của bạn</h2>
                <p className={styles["description"]}>
                    Bạn muốn tăng doanh thu nhà hàng và tối ưu hóa hoạt động của mình?
                </p>
                <p className={styles["description"]}>
                    Bắt đầu thu hút thêm nhiều lượt đặt chỗ từ thực khách ở khắp mọi nơi và trên toàn cầu.
                </p>
                <img
                    className={styles["head-side__img"]}
                    alt="new customer"
                    src={require("../../assets/images/gioi-thieu-seoul-garden.jpg")}
                ></img>
                <div className={styles["form_1"]}>
                    <div className={styles["name-input"]}>
                        <Input
                            type="text"
                            label="Họ và tên đệm"
                        />
                        <Input
                            type="text"
                            label="Tên"
                        />
                    </div>
                    <div className={styles["others-input"]}>
                        <Input
                            type="email"
                            label="Email"
                        />
                        <Input
                            type="text"
                            label="Số điện thoại"
                        />
                    </div>
                    <Button
                        type="primary"
                        style={{ backgroundColor: "" }}
                    >
                        NEXT
                    </Button>
                </div>
            </div>
            <div className={styles["benefit-side"]}>
                <h1 className={styles["benefit-side__title"]}>
                    Gặp gỡ TheMeal, trang web đặt chỗ nhà hàng trực tuyến hàng đầu
                </h1>
                <ul className={styles["benefit-list"]}></ul>
            </div>
            <h1 className={styles["footer-side__title"]}>
                Sẵn sàng để thu hút nhiều khách hàng đến với nhà hàng của bạn?
            </h1>
            <h1 className={styles["footer-sub-title"]}>
                Trở thành đối tác của TheMeal ngay hôm nay, quy trình đơn giản và bạn có thể hủy bất kể lúc nào!
            </h1>
            <Button className={styles["start-btn"]}>BẮT ĐẦU</Button>
        </div>
    );
}

export default RegisterRestaurant1;
