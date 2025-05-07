import { Breadcrumb, Button, Input, Space, Table, Tag, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MenuInOrder from "./MenuInOrder";
import styles from "./style.module.css";
import "./OrderOwner.css";
import Highlighter from "react-highlight-words";
import { QqSquareFilled, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderByRestaurantId,
  updateOrderStatus,
} from "./../../redux/features/orderSlice";
import { format } from "date-fns";
import dayjs from "dayjs";

const { Search } = Input;
function OrderOwner() {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };
  const onSearch = () => {
    console.log("onSearch");
  };
  const { overbookingSettings } = useSelector((state) => state.overbooking);
  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

  const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    })
      .format(value)
      .replace("₫", "đ");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN"); // Kết quả: "25/03/2025"
  };

  const handleUpdateStatus = (orderId, status) => {
    // Assuming you have an action to update order status in your Redux store
    dispatch(
      updateOrderStatus({
        orderId: orderId,
        newStatus: status,
        restaurantId: restaurantOwner.maSoNhaHang,
      })
    )
      .then(() => {
        message.success("Cập nhật trạng thái thành công");
        // Refresh order list
        dispatch(
          getAllOrderByRestaurantId({
            restaurantId: restaurantOwner.maSoNhaHang,
          })
        );
      })
      .catch((error) => {
        message.error("Lỗi khi cập nhật trạng thái: " + error.message);
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tới",
      dataIndex: "date",
      key: "date",
      render: (_, { date }) => {
        return <p>{dayjs(date).format("DD/MM/YYYY HH:mm")}</p>;
      },
    },

    {
      title: "Số khách",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color = status.length > 5 ? "green" : "brown";
        if (status === "COMPLETED") {
          color = "blue";
        } else if (status === "Đã hủy") {
          color = "red";
        } else if (status === "PAID_PENDING_USE") {
          color = "orange";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => {
        return <p style={{ color: "#d61a1b" }}>{formatCurrency(price)}</p>;
      },
    },
    {
      title: "Thanh toán trước",
      dataIndex: "prePay",
      key: "prePay",
      render: (_, { prePay }) => {
        return <p style={{ color: "#d61a1a" }}>{formatCurrency(prePay)}</p>;
      },
    },
    {
      title: "Còn lại",
      key: "remain",
      render: (row) => {
        return (
          <p style={{ color: "#d61a1a" }}>
            {row.price - row.prePay > 0
              ? formatCurrency(row.price - row.prePay)
              : 0}
          </p>
        );
      },
    },
    {
      title: "Tỷ lệ huỷ",
      dataIndex: "tylehuy",
      key: "tylehuy",
      render: (_, record) => {
        const hour = new Date(record.time).getHours(); // dùng record.time
        const cancelRate = record.tylehuy;

        let label = "";
        let color = "";
        let icon = "";
        if (
          overbookingSettings &&
          overbookingSettings.enabled === true &&
          overbookingSettings.thresholds.length > 2
        ) {
          if (
            cancelRate > overbookingSettings.thresholds[2].min / 100 &&
            !(hour >= 19 && hour <= 21)
          ) {
            label = "Overbooking";
            color = "red";
            icon = "⚠️";
          } else if (
            cancelRate >=
            overbookingSettings.thresholds[1].min / 100
          ) {
            label = "Tự huỷ sau 20'";
            color = "orange";
            icon = "🟠";
          } else {
            label = "Đã xác nhận";
            color = "green";
            icon = "🟢";
          }
        }
        return overbookingSettings &&
          overbookingSettings.enabled === true &&
          overbookingSettings.thresholds.length > 2 ? (
          <span style={{ color }}>
            {icon} {Math.round(cancelRate * 100)}% ({label})
          </span>
        ) : (
          <span style={{ color: "#999", fontStyle: "italic" }}>
            Bạn chưa bật cấu hình hoặc cấu hình chưa đủ Overbooking.{" "}
          </span>
        );
      },
    },

    {
      title: "Thời gian tạo",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => {
        return record.status === "PAID_PENDING_USE" ? (
          <>
            <Button
              type="primary"
              onClick={() => handleUpdateStatus(record.id, "COMPLETED")}
              style={{
                backgroundColor: "#52c41a",
                border: "none",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginRight: "10px",
              }}
            >
              Hoàn thành
            </Button>
            <Button
              type="primary"
              onClick={() => handleUpdateStatus(record.id, "CANCELLED")}
              style={{
                marginTop: "5px",
                backgroundColor: "#f5222d",
                border: "none",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Không hoàn thành
            </Button>
          </>
        ) : null;
      },
    },
  ];

  const dispatch = useDispatch();
  const orderSlice = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(
      getAllOrderByRestaurantId({ restaurantId: restaurantOwner.maSoNhaHang })
    );
  }, []);

  useEffect(() => {
    console.log("ORDER LIST: ", orderSlice?.order);
  }, [orderSlice.order]);

  const [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    if (orderSlice.order.length <= 0) return;

    setDataRender(
      orderSlice?.order?.map((order, index) => {
        return {
          stt: index + 1,
          id: order.maSoDatBan,
          key: index,
          name: order.tenKhachHang,
          status: order.trangThai,
          price: order.danhSachMonAn.reduce((acc, cur) => acc + cur.gia, 0),
          tylehuy: order.tyLeHuy,
          description: (
            <MenuInOrder
              menu={
                order.danhSachMonAn.length > 0
                  ? order.danhSachMonAn
                  : order.danhSachCombo
              }
            />
          ),
          time: order.thoiGianTao,
          date: `${order.ngay}T${order.gio}`,
          quantity: order.soKhach,
          remain: Number(order.tongTienThanhToan) || 0,
          prePay: Number(order.tienCoc) || 0, // Đảm bảo `tienCoc` không bị NaN
        };
      })
    );
  }, [orderSlice.order]);

  useEffect(() => {
    console.log("DATA RENDER: ", dataRender);
  }, [dataRender]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Search
          placeholder="Nhập thông tin tìm kiếm"
          onSearch={onSearch}
          enterButton
          style={{ marginTop: "12px" }}
        />

        <Breadcrumb
          style={{ margin: "8px" }}
          items={[
            {
              title: "Danh sách đặt bàn",
            },
            {
              title: "Tất cả",
            },
          ]}
        />

        <Table
          columns={columns}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? styles["row-even"] : styles["row-odd"];
          }}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={dataRender}
        />
      </div>
    </div>
  );
}

export default OrderOwner;
