import React, { useEffect, useMemo, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Col, Divider, Row, Select } from "antd";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
import { useDispatch, useSelector } from "react-redux";
import food from "../../assets/images/food.png";
import money from "../../assets/images/money.png";
import orderImg from "../../assets/images/order.png";
import ship from "../../assets/images/ship.png";
import Statistic from "./components/Statistic";
import CommentCard from "./components/CommentCard";
import TrendingItem from "./components/TrendingItem";
import styles from "./style.module.css";
import { getRestaurantByOwnerId } from "../../redux/features/authenticationSlice";
import {
  getAllOrderByRestaurantId,
  getDanhSachMonAn,
} from "../../redux/features/orderSlice";
import { getFoodImage } from "../../redux/api";
import { BACKEND_URL } from "../../utils/util";
import dayjs from "dayjs";

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

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const labels = weekDays;
const chartOptions = {
  revenue: { responsive: true, plugins: { legend: { position: "top" } } },
  category: {
    responsive: true,
    cutout: "60%",
    plugins: { legend: { display: true, position: "bottom" } },
  },
};

export default function Dashboard_Owner() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.authentication.user);
  const restaurantOwner = useSelector((s) => s.authentication.restaurantOwner);
  const orders = useSelector((s) => s.order.orderAllByRestaurant);
  const danhSachMonAnMap = useSelector((s) => s.order.danhSachMonAnMap);

  const [orderData, setOrderData] = useState({
    labels,
    datasets: [
      {
        label: "Đơn đặt bàn",
        data: [],
        fill: false,
        borderColor: "rgb(75,192,192)",
        tension: 0.1,
      },
    ],
  });
  const [revenueData, setRevenueData] = useState({
    labels,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: [],
        backgroundColor: undefined,
        borderColor: undefined,
        borderWidth: 1,
      },
    ],
  });
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [{ label: "Số lượng", data: [], hoverOffset: 4 }],
  });

  // load restaurant and orders
  useEffect(() => {
    if (user) dispatch(getRestaurantByOwnerId({ ownerId: user.maSoNguoiDung }));
  }, [dispatch, user]);
  useEffect(() => {
    if (restaurantOwner)
      dispatch(
        getAllOrderByRestaurantId({ restaurantId: restaurantOwner.maSoNhaHang })
      );
  }, [dispatch, restaurantOwner]);

  // batch fetch food items for all orders
  useEffect(() => {
    if (orders?.length) {
      const ids = orders.map((o) => o.maSoDatBan);
      dispatch(getDanhSachMonAn(ids));
    }
  }, [dispatch, orders]);

  // derive chart data
  useEffect(() => {
    if (!orders) return;
    const dayCount = Object.fromEntries(weekDays.map((d) => [d, 0]));
    const dayRevenue = Object.fromEntries(weekDays.map((d) => [d, 0]));
    const catCount = {};

    orders.forEach((order) => {
      const day = weekDays[new Date(order.ngay).getDay() - 1] || "Sun";
      dayCount[day]++;
      const items = danhSachMonAnMap[order.maSoDatBan] || [];
      const rev = items.reduce((sum, i) => sum + i.gia * i.soLuong, 0);
      dayRevenue[day] += rev;
      items.forEach(
        (i) => (catCount[i.tenMon] = (catCount[i.tenMon] || 0) + i.soLuong)
      );
    });

    setOrderData({
      labels,
      datasets: [
        { ...orderData.datasets[0], data: weekDays.map((d) => dayCount[d]) },
      ],
    });
    setRevenueData({
      labels,
      datasets: [
        {
          ...revenueData.datasets[0],
          data: weekDays.map((d) => dayRevenue[d]),
        },
      ],
    });
    setCategoryData({
      labels: Object.keys(catCount),
      datasets: [
        { ...categoryData.datasets[0], data: Object.values(catCount) },
      ],
    });
  }, [orders, danhSachMonAnMap]);

  // websocket for live updates
  useEffect(() => {
    const socket = new SockJS(`${BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () =>
        client.subscribe("/topic/messages", (msg) => {
          const live = JSON.parse(msg.body);
          dispatch({ type: "order/liveUpdate", payload: live });
        }),
    });
    client.activate();
    return () => client.deactivate();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles["dashboard-body"]}>
        <h2>Biểu đồ đơn đặt</h2>
        <Line data={orderData} />
        <h2>Biểu đồ doanh thu</h2>
        <Bar data={revenueData} options={chartOptions.revenue} />
        <h2>Danh mục bán chạy</h2>
        <Doughnut data={categoryData} options={chartOptions.category} />
      </div>
    </div>
  );
}
