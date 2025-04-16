import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import BenefitItem from "./components/BenefitItem";
import styles from "./style.module.css";
import { setFirstName, setLastName, setPhone, setEmail } from "../../redux/features/RegisterRestaurantSlice";
function RegisterRestaurant1() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.restaurantRegister);
    const loginUser = useSelector((state) => state.authentication.user);
    const restaurantInfo = useSelector((state) => state.restaurantRegister);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Logo></Logo>
            </div>
            <div className={styles["head-side"]}>
                <h2 className={styles["head-side__title"]}>
                    {" "}
                    Thu hút khách hàng mới đến <br /> nhà hàng của bạn
                </h2>
                <div className={styles["advertise"]}>
                    <div className={styles["description-wrapper"]}>
                        <p className={styles["description"]}>
                            Bạn muốn tăng doanh thu nhà hàng và tối ưu hóa <br />
                            hoạt động của mình?
                        </p>
                        <p className={styles["description"]}>
                            Bắt đầu thu hút thêm nhiều lượt đặt chỗ từ thực khách ở khắp mọi nơi
                            <br /> và trên toàn cầu.
                        </p>
                    </div>
                    <img
                        className={styles["head-side__img"]}
                        alt="new customer"
                        src={require("../../assets/images/gioi-thieu-seoul-garden.jpg")}
                    ></img>
                </div>
                <div className={styles["form_1"]}>
                    <div className={styles["name-input"]}>
                        <div style={{ minWidth: "392px", marginRight: "24px", lineHeight: 1.4 }}>
                            <Input
                                type="text"
                                label="Họ và tên đệm"
                                labelColor="white"
                                initialValue={loginUser ? loginUser.hoTen : ""}
                                placeholder="Hãy nhập họ và tên đệm..."
                                onChange={(name) => {
                                    dispatch(setFirstName(name));
                                }}
                            />
                        </div>
                        <div style={{ minWidth: "392px" }}>
                            <Input
                                type="text"
                                label="Tên"
                                labelColor="white"
                                value={userInfo.lname}
                                placeholder="Hãy nhập tên của bạn..."
                                onChange={(name) => {
                                    dispatch(setLastName(name));
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles["others-input"]}>
                        <div style={{ minWidth: "392px", marginRight: "24px" }}>
                            <Input
                                type="email"
                                label="Email"
                                labelColor="white"
                                value={restaurantInfo ? restaurantInfo.email : ""}
                                placeholder="Hãy nhập email của bạn..."
                                onChange={(name) => {
                                    dispatch(setEmail(name));
                                }}
                            />
                        </div>
                        <div style={{ minWidth: "392px" }}>
                            <Input
                                type="text"
                                label="Số điện thoại"
                                labelColor="white"
                                value={restaurantInfo ? restaurantInfo.phone : ""}
                                placeholder="Hãy nhập SĐT của bạn..."
                                onChange={(name) => {
                                    dispatch(setPhone(name));
                                }}
                            />
                        </div>
                    </div>
                    <p
                        onClick={() => navigate("../register-restaurant2")}
                        className={styles["next-btn"]}
                    >
                        NEXT
                    </p>
                </div>
            </div>
            <div className={styles["benefit-side"]}>
                <h1 className={styles["benefit-side__title"]}>
                    Gặp gỡ TheMeal, trang web đặt chỗ nhà hàng <br /> trực tuyến hàng đầu
                </h1>
                <ul className={styles["benefit-list"]}>
                    <li className={styles["benefit-item"]}>
                        <BenefitItem
                            icon="https://cdn.theforkmanager.com/static/styles/home_benefit/public/2020-01/icon-visibility.png?itok=HJJD_M6_"
                            title="Khả năng hiển thị trực tuyến lớn hơn"
                            description="TheMeal Manager là nền tảng khám phá và đặt chỗ nhà hàng đầu tiên, có mặt tại 12 quốc gia. Bạn có thể nhận ngay một trang tùy chỉnh miễn phí hiển thị trên mọi thiết bị."
                        />
                    </li>
                    <li className={styles["benefit-item"]}>
                        <BenefitItem
                            icon="https://cdn.theforkmanager.com/static/styles/home_benefit/public/2020-01/icon-table.png?itok=-y6JuZGS"
                            title="Tăng tỷ lệ chiếm dụng bàn của bạn"
                            description="Mô hình kinh doanh đôi bên cùng có lợi với rủi ro bằng không cho nhà hàng của bạn. Đề xuất các ưu đãi đặc biệt hoặc tham gia chương trình khách hàng thân thiết và lễ hội YUMS để tăng lượng đặt chỗ ngoài giờ cao điểm."
                        />
                    </li>
                    <li className={styles["benefit-item"]}>
                        <BenefitItem
                            icon="https://cdn.theforkmanager.com/static/styles/home_benefit/public/2020-01/icon-ghost.png?itok=lSpbr-Y9"
                            title="Giảm tỉ lệ khách không đến"
                            description="Giảm tỷ lệ khách không đến bằng cách sử dụng các công cụ của TheFork như email xác nhận tự động và tin nhắn SMS, điểm tin cậy của khách và dấu hiệu thẻ tín dụng."
                        />
                    </li>
                    <li className={styles["benefit-item"]}>
                        <BenefitItem
                            icon="https://cdn.theforkmanager.com/static/styles/home_benefit/public/2020-01/icon-expert.png?itok=9U3IRKAC"
                            title="Dựa vào các chuyên gia trong ngành"
                            description="Đội ngũ TheMeal đã hợp tác với 60K nhà hàng trong hơn 14 năm để phát triển doanh nghiệp của họ bằng cách cung cấp các khóa đào tạo miễn phí, lời khuyên của chuyên gia và dịch vụ hỗ trợ khách hàng 7/7."
                        />
                    </li>
                </ul>
            </div>
            <h1 className={styles["footer-side__title"]}>
                Sẵn sàng để thu hút nhiều khách hàng đến với <br />
                nhà hàng của bạn?
            </h1>
            <h1 className={styles["footer-sub-title"]}>
                Trở thành đối tác của TheMeal ngay hôm nay, quy trình đơn giản và bạn có thể hủy bất kể lúc nào!
            </h1>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <Button
                    style={{ backgroundColor: "#00645a", color: "white", margin: "12px auto" }}
                    className={styles["start-btn"]}
                >
                    BẮT ĐẦU
                </Button>
            </div>
        </div>
    );
}

export default RegisterRestaurant1;
