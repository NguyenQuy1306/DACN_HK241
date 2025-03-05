import { Client } from "@stomp/stompjs";
import { Col, Divider, Input, message, Row, Select } from "antd";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useMemo, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import food from "../../assets/images/food.png";
import money from "../../assets/images/money.png";
import ship from "../../assets/images/ship.png";
import SidebarOwner from "../../components/SidebarOwner";
import CommentCard from "./components/CommentCard";
import Statistic from "./components/Statistic";
import TrendingItem from "./components/TrendingItem";
import styles from "./style.module.css";
import orderImg from "../../assets/images/order.png";
import { getAllOrders } from "../../redux/features/orderSlice";
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
    const [collapsed, setCollapsed] = useState(false);
    const [input, setInput] = useState("");
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const [stompClient, setStompClient] = useState(null);
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);
    console.log("order in dash",order)
    const [messages, setMessages] = useState(order);


    useEffect(() => {
        console.log("Fetching orders...");
        dispatch(getAllOrders());
    }, [dispatch]); // Keep dependency to avoid unnecessary calls
    
    console.log("messages",messages)
    // useEffect(() => console.log("ORDER LIST FROM REDUX: ", messages), [messages]);
    const cancelledOrder = messages? messages.filter((item) => item.trangThai === "CANCELED").length:0;

    useEffect(() => {
        setMessages(order);
    }, [order]);

    // useEffect(() => {
    //     sendMessage(); // Dispatch action getAllOrders
    // }, []);

    useEffect(() => {
        // Khởi tạo kết nối WebSocket khi component mount
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: { withCredentials: true }, // Sử dụng SockJS làm transport
            onConnect: () => {
                setStompClient(client);
                alert("Connecting to websocket....");
                client.subscribe("/topic/messages", (message) => {
                    console.log("DATA WEBSOCKET NHẬN ĐƯỢC: ", message.body);
                    setMessages(JSON.parse(message.body));
                });
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
            },
            debug: (str) => {
                console.log(str); // Bật debug để xem log
            },
        });

        client.activate(); // Kích hoạt kết nối

        return () => {
            if (client) {
                client.deactivate(); // Ngắt kết nối khi component unmount
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient) {
            stompClient.publish({
                destination: "/app/sendMessage", // Đích đến trên server
                body: "Hello", // Nội dung message
            });
        }
    };

    return (
        <div className={styles.container}>
            <SidebarOwner collapsed={collapsed} />
            <div className={styles["dashboard-body"]}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button onClick={sendMessage}>Send</button>
                    <p style={{ margin: 0, marginLeft: "8px", color: "rgb(28,69,28)" }}>Bạn đang xem thống kê theo</p>
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
                </div>
                <Row
                    gutter={16}
                    className={styles["statistic-wrap"]}
                >
                    <Col span={6}>
                        <Statistic
                            img={food}
                            title="Tổng đơn đặt"
                            quantity={messages?.length}
                            up={true}
                            rate={3}
                            compare="So với hôm qua"
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            img={ship}
                            title="Khung giờ đặt nhiều nhất"
                            quantity={"17 - 20"}
                            up={true}
                            compare=""
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            img={orderImg}
                            title="Tổng đơn bị hủy"
                            quantity={cancelledOrder}
                            up={false}
                            rate={12}
                            compare="So với hôm qua"
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            img={money}
                            title="Tổng doanh thu (VND)"
                            quantity={4800000}
                            up={true}
                            rate={13}
                            compare="So với hôm qua"
                        />
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

                <h2 style={{ color: "rgb(28,69,28)" }}>Nhận xét của khách hàng</h2>

                <div className={styles["comment-wrap"]}>
                    <CommentCard />
                    <CommentCard />
                </div>
                <div className={styles["trending-wrap"]}>
                    <div className={styles.trending}>
                        <h3
                            style={{ paddingLeft: "16px", marginTop: "12px", fontSize: "20px", color: "rgb(28,69,28)" }}
                        >
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
