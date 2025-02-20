import React from "react";
import styles from "./style.module.css";
import { IoNotifications } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Select } from "antd";
import { Input, Divider } from "antd";
import TrendingItem from "./components/TrendingItem";
import Statistic from "./components/Statistic";
import ship from "../../assets/images/ship.png";
import food from "../../assets/images/food.png";
import order from "../../assets/images/order.png";
import money from "../../assets/images/money.png";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
} from "chart.js";
import CommentCard from "./components/CommentCard";
import SidebarOwner from "../../components/SidebarOwner";
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    datasets: [
        {
            label: "Triệu đồng",
            data: [65, 59, 80, 81, 56, 55, 100, 120, 90, 110, 86, 88],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
    ],
};

// Tùy chọn cho biểu đồ
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
    },
};

const data3 = {
    labels: ["Lầu thái", "Salad hoa quả", "Tôm hấp bia", "Lẩu cua đồng"],
    datasets: [
        {
            label: "Số lượng",
            data: [30, 20, 25, 25], // Phần trăm hoặc số lượng
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            hoverOffset: 4, // Hiệu ứng khi hover
        },
    ],
};

// Tùy chỉnh biểu đồ
const options3 = {
    responsive: true,
    cutout: "60%", // Điều chỉnh độ dày của vòng donut
    plugins: {
        legend: {
            display: true,
            position: "bottom",
        },
    },
};

const getMonthLabels = (count) => {
    const months = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    return months.slice(0, count);
};

const labels = getMonthLabels(7);
const data2 = {
    labels: labels,
    datasets: [
        {
            label: "Đơn đặt bàn",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};
const handleChange = (value) => {
    console.log(`selected ${value}`);
};

function Dashboard_Owner() {
    return (
        <div className={styles.container}>
            <SidebarOwner />
            <div>
                <div className={styles["dash_header"]}>
                    <div className={styles["search-wrap"]}>
                        <Search
                            placeholder="Search"
                            allowClear
                            enterButton
                            size="large"
                            onSearch={onSearch}
                        />
                    </div>

                    <div className={styles.noti}>
                        <div className={`${styles["icon_wrap"]} ${styles["icon-wrap--notification"]}`}>
                            <IoNotifications
                                size={22}
                                color="#4C95DD"
                            />
                        </div>
                        <div className={`${styles["icon_wrap"]} ${styles["icon-wrap--message"]}`}>
                            <FaMessage
                                size={20}
                                color="#4C95DD"
                            />
                        </div>
                        <div className={`${styles["icon_wrap"]} ${styles["icon-wrap--setting"]}`}>
                            <IoMdSettings
                                size={24}
                                color="#E66430"
                            />
                        </div>
                    </div>
                </div>
                <Select
                    defaultValue="Ngày"
                    style={{
                        width: 120,
                        marginLeft: "10px",
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: "ngay",
                            label: "Ngày",
                        },
                        {
                            value: "thang",
                            label: "Tháng",
                        },
                        {
                            value: "nam",
                            label: "Năm",
                        },
                    ]}
                />
                <Row
                    gutter={16}
                    className={styles["statistic-wrap"]}
                >
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                img={food}
                                title="Tổng đơn đặt"
                                quantity={100}
                                up={true}
                                rate={3}
                                compare="So với hôm qua"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                img={ship}
                                title="Khung giờ đặt nhiều nhất"
                                quantity={"17 - 20"}
                                up={true}
                                compare=""
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                img={order}
                                title="Tổng đơn bị hủy"
                                quantity={8}
                                up={false}
                                rate={12}
                                compare="So với hôm qua"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                img={money}
                                title="Tổng doanh thu (VND)"
                                quantity={32000000}
                                up={true}
                                rate={13}
                                compare="So với hôm qua"
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <div className={styles["chart-wrap"]}>
                    <div className={styles["order-statistic"]}>
                        <h2 className={styles["line-title"]}>Biểu đồ chi tiết đơn đặt bàn</h2>
                        <Line
                            data={data2}
                            label={labels}
                        />
                    </div>
                    <div className={styles["order-statistic"]}>
                        <h2 className={styles["bar-title"]}>Biểu đồ chi tiết doanh thu</h2>
                        <Bar
                            data={data}
                            options={options}
                        />
                    </div>
                </div>
                <Divider />

                <h2>Nhận xét của khách hàng</h2>

                <div className={styles["comment-wrap"]}>
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                </div>
                <div className={styles["trending-wrap"]}>
                    <div className={styles.trending}>
                        <h3 style={{ paddingLeft: "16px", marginTop: "12px", fontSize: "20px" }}>
                            Top 10 món ăn bán chạy nhất
                        </h3>
                        <Divider />
                        <TrendingItem />
                        <Divider />
                        <TrendingItem />
                        <Divider />
                        <TrendingItem />
                        <Divider />
                        <TrendingItem />
                        <Divider />
                        <TrendingItem />
                    </div>
                    <div className={styles.doughnut}>
                        <h2 className={styles["doughnut-title"]}>Tỷ lệ danh mục món ăn được đặt</h2>
                        <Doughnut
                            data={data3}
                            options={options3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Owner;
