import { Client } from "@stomp/stompjs";
import { Col, Divider, Row, Select } from "antd";
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
import food from "../../assets/images/food.png";
import money from "../../assets/images/money.png";
import orderImg from "../../assets/images/order.png";
import ship from "../../assets/images/ship.png";
import { getRestaurantByOwnerId } from "../../redux/features/authenticationSlice";
import CommentCard from "./components/CommentCard";
import Statistic from "./components/Statistic";
import TrendingItem from "./components/TrendingItem";
import styles from "./style.module.css";

import { getFoodImage } from "../../redux/api";
import { BACKEND_URL } from "../../utils/util";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

function Dashboard_Owner() {
  const [stompClient, setStompClient] = useState(null);
  const dispatch = useDispatch();
  const { orderAllByRestaurant } = useSelector((state) => state.order);
  const user = useSelector((state) => state.authentication.user);
  const [messages, setMessages] = useState(orderAllByRestaurant);
  const itemsMap = useSelector((s) => s.order.danhSachMonAnMap);

  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );

  const [orderData, setOrderData] = useState({
    labels,
    datasets: [
      {
        label: "Đơn đặt bàn",
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

  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        label: "Số lượng",
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverOffset: 4,
      },
    ],
  });

  const processOrderData = (orders) => {
    const dayData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    orders.forEach((order) => {
      const day = getDayOfWeek(order.ngay);
      const items = itemsMap[order.maSoDatBan] || [];
      dayData[day] += 1; // Increment the count for the day
    });

    return Object.values(dayData);
  };

  const processRevenueData = (orders) => {
    const dayData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    orders.forEach((order) => {
      const day = getDayOfWeek(order.ngay);
      const items = itemsMap[order.maSoDatBan] || [];
      const revenue = items.reduce((acc, cur) => acc + cur.gia, 0);
      dayData[day] += revenue; // Add the revenue for the day
    });

    return Object.values(dayData);
  };

  const processCategoryData = (orders) => {
    const categoryData = {};

    orders.forEach((order) => {
      const items = itemsMap[order.maSoDatBan] || [];
      items.forEach((item) => {
        if (categoryData[item.tenMon]) {
          categoryData[item.tenMon] += 1;
        } else {
          categoryData[item.tenMon] = 1;
        }
      });
    });

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    return { labels, data };
  };

  // useEffect(() => {
  //     console.log("DON HANG NHA VE DASHBOARD: ", messages); // Dispatch action getAllOrders
  // }, [messages]);

  useEffect(() => {
    if (user) {
      dispatch(getRestaurantByOwnerId({ ownerId: user?.maSoNguoiDung }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Khởi tạo kết nối WebSocket khi component mount
    const socket = new SockJS(`${BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { withCredentials: true }, // Sử dụng SockJS làm transport
      onConnect: () => {
        setStompClient(client);
        client.subscribe("/topic/messages", (message) => {
          // console.log("DATA WEBSOCKET NHẬN ĐƯỢC: ", message.body);
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

  // Calculate menu names using itemsMap
  const menuNames = messages.reduce((acc, cur) => {
    const items = itemsMap[cur.maSoDatBan] || [];
    return new Set([...acc, ...items.map((i) => i.tenMon)]);
  }, new Set());

  const timeFrame = messages.reduce(
    (acc, cur) => new Set([...acc, cur.gio]),
    new Set()
  );

  const timeFrameDetail = [...timeFrame].reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});

  messages.forEach((item) => {
    timeFrameDetail[item.gio] += 1;
  });

  const timeFrameDetailArray = Object.entries(timeFrameDetail)
    .sort((a, b) => b[1] - a[1])
    .map((i) => i[0]);

  const topTrending = [...menuNames].map((i) => {
    return {
      name: i,
      quantity: 0,
      price: 0,
      url: "",
      id: null,
    };
  }, []);

  const [foodIdList, setFoodIdList] = useState([]);
  const [foodImage, setFoodImage] = useState([]);

  // Update topTrending with itemsMap data
  messages.forEach((item) => {
    const items = itemsMap[item.maSoDatBan] || [];
    items.forEach((i) => {
      const curItem = topTrending.find((item1) => item1.name === i.tenMon);
      if (curItem) {
        curItem.quantity += i.soLuong;
        curItem.price = i.gia;
        curItem.id = i.maSo?.maSoMonAn;
      }
    });
  });

  useEffect(() => {
    topTrending.forEach((i) => {
      const foundImage = foodImage.find((item) => item.foodId === i.id);
      i.url = foundImage ? foundImage.imageUrl : "";
    });
  }, [foodImage]);

  useEffect(() => {
    const IdList = messages.reduce((acc, cur) => {
      const items = itemsMap[cur.maSoDatBan] || [];
      const request = items
        .map((i) => {
          return i.maSo?.maSoMonAn;
        })
        .filter((id) => id); // Filter out undefined/null IDs
      return new Set([...acc, ...request]);
    }, new Set());
    setFoodIdList([...IdList]);
  }, [messages, itemsMap]);

  useEffect(() => {
    const callFoodImage = async () => {
      // Tạo imageRequest từ foodIdList
      const imageRequest = foodIdList.map((foodId) => ({
        restaurantId: restaurantOwner.maSoNhaHang,
        foodId,
      }));

      try {
        // Gọi API lấy ảnh
        const result = await getFoodImage(imageRequest);
        setFoodImage(result.payload);
      } catch (error) {
        console.error("Failed to fetch food images:", error);
      }
    };

    if (foodIdList.length > 0 && restaurantOwner?.maSoNhaHang) {
      callFoodImage();
    }
  }, [foodIdList, restaurantOwner?.maSoNhaHang]);

  useEffect(() => {
    console.log("IMAGE OF FOOD: ", foodImage);
  }, [foodImage]);

  useEffect(() => {
    setMessages(orderAllByRestaurant);
  }, [orderAllByRestaurant]);

  useEffect(() => {
    if (messages.length > 0) {
      const processedOrderData = processOrderData(messages);
      const processedRevenueData = processRevenueData(messages);
      const processedCategoryData = processCategoryData(messages);
      setOrderData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: processedOrderData,
          },
        ],
      }));

      setRevenueData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: processedRevenueData,
          },
        ],
      }));

      setCategoryData((prevData) => ({
        ...prevData,
        labels: processedCategoryData.labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: processedCategoryData.data,
          },
        ],
      }));
    }
  }, [messages, itemsMap]);

  // Calculate total revenue from itemsMap
  const totalRevenue = messages.reduce((acc, cur) => {
    const items = itemsMap[cur.maSoDatBan] || [];
    return acc + items.reduce((itemAcc, item) => itemAcc + item.gia, 0);
  }, 0);

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
          <Row gutter={16} className={styles["statistic-wrap"]}>
            <Col span={6}>
              <Statistic
                img={food}
                title=<p style={{ marginBottom: "8px" }}>Tổng đơn đặt</p>
                quantity={messages.length}
                up={true}
                rate={3}
                compare="So với hôm qua"
              />
            </Col>
            <Col span={6}>
              <Statistic
                img={orderImg}
                title="Tổng đơn bị hủy"
                quantity={
                  messages
                    ? messages.filter(
                        (item) => item.trangThai === "CANCELLED_REFUNDED"
                      ).length
                    : 0
                }
                up={false}
                rate={12}
                compare="So với hôm qua"
              />
            </Col>
            <Col span={6}>
              <Statistic
                img={ship}
                title="Khung giờ đặt nhiều nhất"
                quantity={timeFrameDetailArray[0]?.slice(0, 5)}
                up={true}
                compare=""
              />
            </Col>

            <Col span={6}>
              <Statistic
                img={money}
                title="Tổng doanh thu (VND)"
                quantity={formatCurrency(totalRevenue)}
                up={true}
                rate={13}
                compare="So với hôm qua"
              />
            </Col>
          </Row>
          <Divider />
          <div className={styles["chart-wrap"]}>
            <div className={styles["order-statistic"]}>
              <h2 className={styles["line-title"]}>
                Biểu đồ chi tiết đơn đặt bàn
              </h2>
              <Line data={orderData} label={labels} />
            </div>
            <div className={styles["order-statistic"]}>
              <h2 className={styles["bar-title"]}>
                Biểu đồ chi tiết doanh thu
              </h2>
              <Bar data={revenueData} options={chartOptions.revenue} />
            </div>
          </div>
          <Divider />

          <h2 style={{ color: "rgb(28,69,28)" }}>
            Nhận xét gần đây của khách hàng
          </h2>

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
                Top các món ăn bán chạy nhất
              </h2>
              {topTrending
                .sort((a, b) => b["quantity"] - a["quantity"])
                .map((item, index) => {
                  return (
                    <TrendingItem
                      rank={index + 1}
                      key={index}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      url={item.url}
                    />
                  );
                })}

              <Divider />
            </div>
            <div className={styles.doughnut}>
              <h2 className={styles["doughnut-title"]}>
                Tỷ lệ danh mục món ăn được đặt
              </h2>
              <Doughnut data={categoryData} options={chartOptions.category} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard_Owner;
