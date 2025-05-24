import { Breadcrumb, Button, Input, Space, Table, Tag, message } from "antd";
import React, { useEffect, useRef, useState, useMemo } from "react";
import MenuInOrder from "./MenuInOrder";
import styles from "./style.module.css";
import "./OrderOwner.css";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderByRestaurantId,
  updateOrderStatus,
  getDanhSachMonAn,
} from "./../../redux/features/orderSlice";
import dayjs from "dayjs";

const { Search } = Input;

export default function OrderOwner() {
  const dispatch = useDispatch();
  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );
  const overbookingSettings = useSelector(
    (state) => state.overbooking.overbookingSettings
  );
  const orders = useSelector((state) => state.order.orderAllByRestaurant);
  const danhSachMonAnMap = useSelector((state) => state.order.danhSachMonAnMap);
  console.log("danhSachMonAnMap:  ", danhSachMonAnMap);
  useEffect(() => {
    if (restaurantOwner) {
      dispatch(
        getAllOrderByRestaurantId({ restaurantId: restaurantOwner.maSoNhaHang })
      );
    }
  }, [dispatch, restaurantOwner]);

  useEffect(() => {
    if (orders && orders.length) {
      orders.forEach((order) => {
        dispatch(getDanhSachMonAn({ orderId: order.maSoDatBan }));
      });
    }
  }, [dispatch, orders]);

  // build table data
  const dataRender = useMemo(() => {
    if (!orders) return [];
    return orders.map((order, idx) => {
      const items = danhSachMonAnMap[order.maSoDatBan] || [];

      console.log("order.maSoDatBan: ", order.maSoDatBan);
      console.log("order.maSoDatBan: ", order.maSoDatBan);
      console.log("items: ", items);
      const totalPrice = items.reduce(
        (sum, it) => sum + it.gia * it.soLuong,
        0
      );
      const prePay = order.tienCoc || 0;
      return {
        stt: idx + 1,
        id: order.maSoDatBan,
        key: order.maSoDatBan,
        name: order.tenKhachHang,
        date: `${order.ngay}T${order.gio}`,
        quantity: order.soKhach,
        status: order.trangThai,
        price: totalPrice,
        prePay,
        remain: Math.max(totalPrice - prePay, 0),
        tylehuy: order.tyLeHuy,
        time: order.thoiGianTao,
        description: <MenuInOrder menu={items} />,
      };
    });
  }, [orders, danhSachMonAnMap]);

  const handleUpdateStatus = (orderId, status) => {
    dispatch(
      updateOrderStatus({
        orderId,
        newStatus: status,
        restaurantId: restaurantOwner.maSoNhaHang,
      })
    )
      .unwrap()
      .then(() => {
        message.success("Cập nhật trạng thái thành công");
        dispatch(
          getAllOrderByRestaurantId({
            restaurantId: restaurantOwner.maSoNhaHang,
          })
        );
      })
      .catch((err) => message.error("Lỗi: " + err.message));
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(value)
      .replace("₫", "đ");

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt" },
    { title: "Mã đơn", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    {
      title: "Ngày tới",
      dataIndex: "date",
      key: "date",
      render: (_, { date }) => <p>{dayjs(date).format("DD/MM/YYYY HH:mm")}</p>,
    },
    { title: "Số khách", dataIndex: "quantity", key: "quantity" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color = status.length > 5 ? "green" : "brown";
        if (status === "COMPLETED") color = "blue";
        else if (status === "Đã hủy") color = "red";
        else if (status === "PAID_PENDING_USE") color = "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <p style={{ color: "#d61a1b" }}>{formatCurrency(price)}</p>
      ),
    },
    {
      title: "Thanh toán trước",
      dataIndex: "prePay",
      key: "prePay",
      render: (_, { prePay }) => (
        <p style={{ color: "#d61a1a" }}>{formatCurrency(prePay)}</p>
      ),
    },
    {
      title: "Còn lại",
      dataIndex: "remain",
      key: "remain",
      render: (_, { remain }) => (
        <p style={{ color: "#d61a1a" }}>{formatCurrency(remain)}</p>
      ),
    },
    {
      title: "Tỷ lệ huỷ",
      dataIndex: "tylehuy",
      key: "tylehuy",
      render: (_, record) => {
        const hour = new Date(record.time).getHours();
        const rate = record.tylehuy;
        if (!overbookingSettings?.enabled)
          return <i style={{ color: "#999" }}>Chưa bật cấu hình</i>;
        const th = overbookingSettings.thresholds;
        let label = "Đã xác nhận",
          icon = "🟢",
          color = "green";
        if (rate > th[2].min / 100 && !(hour >= 19 && hour <= 21)) {
          label = "Overbooking";
          icon = "⚠️";
          color = "red";
        } else if (rate >= th[1].min / 100) {
          label = "Tự huỷ sau 20'";
          icon = "🟠";
          color = "orange";
        }
        return (
          <span style={{ color }}>
            {icon} {Math.round(rate * 100)}% ({label})
          </span>
        );
      },
    },
    { title: "Thời gian tạo", dataIndex: "time", key: "time" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, { id, status }) =>
        status === "PAID_PENDING_USE" && (
          <Space>
            <Button
              type="primary"
              onClick={() => handleUpdateStatus(id, "COMPLETED")}
            >
              Hoàn thành
            </Button>
            <Button danger onClick={() => handleUpdateStatus(id, "CANCELLED")}>
              Không hoàn thành
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Search
          placeholder="Nhập thông tin tìm kiếm"
          // onSearch={onSearch}
          enterButton
          style={{ margin: "12px 0" }}
        />
        <Breadcrumb
          style={{ margin: 8 }}
          items={[{ title: "Danh sách đặt bàn" }, { title: "Tất cả" }]}
        />
        <Table
          columns={columns}
          dataSource={dataRender}
          rowKey="key"
          expandable={{ expandedRowRender: (r) => <div>{r.description}</div> }}
          rowClassName={(_, i) =>
            i % 2 === 0 ? styles["row-even"] : styles["row-odd"]
          }
        />
      </div>
    </div>
  );
}
