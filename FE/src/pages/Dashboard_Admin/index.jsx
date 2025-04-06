import { Client } from "@stomp/stompjs";
import { Col, Divider, message, Row, Select } from "antd";

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
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import cancelImg from "../../assets/images/cancel.svg";
import money from "../../assets/images/money.png";
import partnerImg from "../../assets/images/partner.svg";
import waitingImg from "../../assets/images/waiting.svg";
import { getAllRestaurants } from "../../redux/features/adminSlice";
import CommentCard from "./components/CommentCard";
import Statistic from "./components/Statistic";
import TrendingItem from "./components/TrendingItem";
import styles from "./style.module.css";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
    revenue: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    },

    category: {
        responsive: true,
        cutout: "60%",
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
        },
    },
};

const getMonthLabels = (count) => {
    const months = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    return months.slice(0, count);
};

const labels = getMonthLabels(7);

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
};

const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    })
        .format(value)
        .replace("₫", "");
};

function Dashboard_Admin() {
    const dispatch = useDispatch();
    const { restaurants } = useSelector((state) => state.admin);
    const [stompClient, setStompClient] = useState(null);

    const [messages, setMessages] = useState(restaurants);

    const [joinData, setJoinData] = useState({
        labels,
        datasets: [
            {
                label: "Đối tác liên kết",
                data: [0, 0, 0, 0, 0, 0, 0],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    });

    const [revenueData, setRevenueData] = useState({
        labels,
        datasets: [
            {
                label: "Doanh thu (VND)",
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    });

    const [regionData, setRegionData] = useState({
        labels: [],
        datasets: [
            {
                label: "Phần trăm",
                data: [],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
                hoverOffset: 4,
            },
        ],
    });

    const processJoinData = (orders) => {
        const dayData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

        orders.forEach((order) => {
            const day = getDayOfWeek(order.ngayThamGia);
            dayData[day] += 1; // Increment the count for the day
        });

        return Object.values(dayData);
    };

    const processRevenueData = (orders) => {
        const dayData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

        orders.forEach((order) => {
            const day = getDayOfWeek(order.ngay);
            const revenue = order.danhSachMonAn.reduce((acc, cur) => acc + cur.gia, 0);
            dayData[day] += revenue; // Add the revenue for the day
        });

        return Object.values(dayData);
    };

    const processRegionData = (res) => {
        const regionData = {};

        res.forEach((item) => {
            if (regionData[item.thanhPho]) {
                regionData[item.thanhPho] += 1;
            } else {
                regionData[item.thanhPho] = 1;
            }
        });

        const labels = Object.keys(regionData);
        const data = Object.values(regionData);
        const total = data.reduce((acc, cur) => acc + cur, 0);
        const percentData = data.map((item) => ((item / total) * 100).toFixed(2));

        return { labels, percentData };
    };

    useEffect(() => {
        dispatch(getAllRestaurants());
    }, [dispatch]);

    useEffect(() => {
        // Khởi tạo kết nối WebSocket khi component mount
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: { withCredentials: true }, // Sử dụng SockJS làm transport
            onConnect: () => {
                setStompClient(client);
                client.subscribe("/topic/restaurants", (message) => {
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

    // const menuNames = messages.reduce(
    //     (acc, cur) => new Set([...acc, ...cur.danhSachMonAn.map((i) => i.tenMon, [])]),
    //     new Set(),
    // );

    // const timeFrame = messages.reduce((acc, cur) => new Set([...acc, cur.gio]), new Set());

    // const timeFrameDetail = [...timeFrame].reduce((acc, cur) => {
    //     acc[cur] = 0;
    //     return acc;
    // }, {});

    // messages.forEach((item) => {
    //     timeFrameDetail[item.gio] += 1;
    // });

    // const timeFrameDetailArray = Object.entries(timeFrameDetail)
    //     .sort((a, b) => b[1] - a[1])
    //     .map((i) => i[0]);

    // const topTrending = [...menuNames].map((i) => {
    //     return {
    //         name: i,
    //         quantity: 0,
    //         price: 0,
    //     };
    // }, []);

    // const topMenuTrending = messages.forEach((item) => {
    //     item.danhSachMonAn.forEach((i) => {
    //         const curItem = topTrending.find((item1) => item1.name === i.tenMon);
    //         curItem.quantity += i.soLuong;
    //         curItem.price = i.gia;
    //     });
    // });

    useEffect(() => {
        if (messages.length > 0) {
            const processedRegionData = processRegionData(messages);
            const processedJoinData = processJoinData(messages);
            // const processedCategoryData = processCategoryData(messages);
            // setOrderData((prevData) => ({
            //     ...prevData,
            //     datasets: [
            //         {
            //             ...prevData.datasets[0],
            //             data: processedOrderData,
            //         },
            //     ],
            // }));

            setJoinData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: processedJoinData,
                    },
                ],
            }));

            setRegionData((prevData) => ({
                ...prevData,
                labels: processedRegionData.labels,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: processedRegionData.percentData,
                    },
                ],
            }));
        }
    }, [messages]);

    useEffect(() => {
        setMessages(restaurants);
    }, [restaurants]);

    useEffect(() => {
        console.log("RESTAURANT LIST: ", messages);
    }, [messages]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles["dashboard-body"]}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* {stompClient && <div>Đang lắng nghe từ server websocket | </div>}
                        {!stompClient && <div>Đang tạm không lắng nghe từ server websocket | </div>} */}
                        <p style={{ margin: 0, marginLeft: "8px", color: "rgb(28,69,28)" }}>
                            Bạn đang xem thống kê theo
                        </p>
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
                                img={partnerImg}
                                title=<p style={{ marginBottom: "8px" }}>Tổng số đối tác</p>
                                quantity={messages.length}
                                up={true}
                                rate={3}
                                compare="So với hôm qua"
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                img={waitingImg}
                                title="Đối tác chờ duyệt"
                                quantity={messages.filter((i) => i.trangThai === "pending").length}
                                up={false}
                                rate={12}
                                compare="So với hôm qua"
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                img={cancelImg}
                                title="Đối tác đã hủy"
                                quantity={messages.filter((i) => i.trangThai === "deactive").length}
                                up={true}
                                compare=""
                            />
                        </Col>

                        <Col span={6}>
                            <Statistic
                                img={money}
                                title="Tổng doanh thu (VND)"
                                quantity={formatCurrency(0)}
                                up={true}
                                rate={13}
                                compare="So với hôm qua"
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <div className={styles["chart-wrap"]}>
                        <div className={styles["order-statistic"]}>
                            <h2 className={styles["line-title"]}>Biểu đồ đối tác mới</h2>
                            <Line
                                data={joinData}
                                label={labels}
                            />
                        </div>
                        <div className={styles["order-statistic"]}>
                            <h2 className={styles["bar-title"]}>Biểu đồ chi tiết doanh thu</h2>
                            <Bar
                                data={revenueData}
                                options={chartOptions.revenue}
                            />
                        </div>
                    </div>
                    <Divider />

                    <h2 style={{ color: "rgb(28,69,28)" }}>Nhận xét của nhà hàng</h2>

                    <div className={styles["comment-wrap"]}>
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                    </div>
                    <div className={styles["trending-wrap"]}>
                        <div className={styles.trending}>
                            <h2
                                style={{
                                    paddingLeft: "16px",
                                    marginTop: "12px",
                                    color: "rgb(28,69,28)",
                                }}
                            >
                                Top các nhà hàng có doanh số cao nhất
                            </h2>
                            {/* {topTrending
                                .sort((a, b) => b["quantity"] - a["quantity"])
                                .map((item, index) => {
                                    return (
                                        <TrendingItem
                                            rank={index + 1}
                                            key={index}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                        />
                                    );
                                })} */}

                            <Divider />
                        </div>
                        <div className={styles.doughnut}>
                            <h2 className={styles["doughnut-title"]}>Tỷ lệ nhà hàng theo khu vực</h2>
                            <Doughnut
                                data={regionData}
                                options={chartOptions.category}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard_Admin;
