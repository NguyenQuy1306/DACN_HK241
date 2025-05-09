import { SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Space, Table, Tag, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByRestaurantId, updateOrderStatus } from "../../redux/features/orderSlice";
import MenuInOrder from "./MenuInOrder";
import "./OrderOwner.css";
import styles from "./style.module.css";

const { Search } = Input;

function OrderOwner() {
    const [searchText, setSearchText] = useState("");
    const searchInput = useRef(null);
    const dispatch = useDispatch();
    const { overbookingSettings } = useSelector((state) => state.overbooking);
    const restaurantOwner = useSelector((state) => state.authentication.restaurantOwner);
    const orderSlice = useSelector((state) => state.order);

    const [dataRender, setDataRender] = useState([]);

    useEffect(() => {
        if (restaurantOwner?.maSoNhaHang) {
            dispatch(getAllOrderByRestaurantId({ restaurantId: restaurantOwner.maSoNhaHang }));
        }
    }, [dispatch, restaurantOwner]);

    useEffect(() => {
        if (orderSlice.order?.length > 0) {
            setDataRender(
                orderSlice.order.map((order, index) => ({
                    stt: index + 1,
                    id: order.maSoDatBan,
                    key: order.maSoDatBan,
                    name: order.tenKhachHang,
                    status: order.trangThai,
                    price: Number(order.tongTienThanhToan) || 0,
                    prePay: Number(order.tienCoc || 0),
                    tylehuy: order.tyLeHuy,
                    date: `${order.ngay}T${order.gio}`,
                    quantity: order.soKhach,
                    time: order.thoiGianTao,
                    description: (
                        <MenuInOrder
                            menu={order.danhSachMonAn.length > 0 ? order.danhSachMonAn : order.danhSachCombo}
                        />
                    ),
                })),
            );
        }
    }, [orderSlice.order]);

    const formatCurrency = (value, locale = "vi-VN", currency = "VND") =>
        new Intl.NumberFormat(locale, { style: "currency", currency }).format(value).replace("₫", "đ");

    const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString("vi-VN");

    const handleUpdateStatus = (orderId, status) => {
        dispatch(
            updateOrderStatus({
                orderId,
                newStatus: status,
                restaurantId: restaurantOwner.maSoNhaHang,
            }),
        )
            .then(() => {
                message.success("Cập nhật trạng thái thành công");
                dispatch(getAllOrderByRestaurantId({ restaurantId: restaurantOwner.maSoNhaHang }));
            })
            .catch((error) => {
                message.error("Lỗi khi cập nhật trạng thái: " + error.message);
            });
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
            <div
                style={{ padding: 8 }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={close}
                        type="link"
                        size="small"
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
        onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) setTimeout(() => searchInput.current?.select(), 100);
            },
        },
    });

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 60,
        },
        {
            title: "Mã đơn",
            dataIndex: "id",
            key: "id",
            ...getColumnSearchProps("id"),
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Ngày tới",
            dataIndex: "date",
            key: "date",
            render: (date) => <p>{dayjs(date).format("DD/MM/YYYY HH:mm")}</p>,
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
            title: "Số khách",
            dataIndex: "quantity",
            key: "quantity",
            sorter: (a, b) => new Date(a.quantity) - new Date(b.quantity),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "brown";
                if (status === "COMPLETED") color = "blue";
                else if (status === "Đã hủy" || status === "CANCELLED") color = "red";
                else if (status === "PAID_PENDING_USE") color = "orange";

                return (
                    <Tag
                        color={color}
                        key={status}
                    >
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "price",
            key: "price",
            render: (price) => <p style={{ color: "#d61a1b" }}>{formatCurrency(price)}</p>,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Thanh toán trước",
            dataIndex: "prePay",
            key: "prePay",
            render: (prePay) => <p style={{ color: "#d61a1a" }}>{formatCurrency(prePay)}</p>,
            sorter: (a, b) => a.prePay - b.prePay,
        },
        {
            title: "Còn lại",
            key: "remain",
            render: (_, record) => {
                const remain = Math.max(record.price - record.prePay, 0);
                return <p style={{ color: "#d61a1a" }}>{formatCurrency(remain)}</p>;
            },
            sorter: (a, b) => a.remain - b.remain,
        },
        {
            title: "Tỷ lệ huỷ",
            dataIndex: "tylehuy",
            key: "tylehuy",
            render: (_, record) => {
                const hour = new Date(record.time).getHours();
                const cancelRate = record.tylehuy;
                let label = "",
                    color = "",
                    icon = "";

                if (overbookingSettings?.enabled && overbookingSettings.thresholds.length > 2) {
                    const [_, threshold2, threshold3] = overbookingSettings.thresholds;

                    if (cancelRate > threshold3.min / 100 && !(hour >= 19 && hour <= 21)) {
                        label = "Overbooking";
                        color = "red";
                        icon = "⚠️";
                    } else if (cancelRate >= threshold2.min / 100) {
                        label = "Tự huỷ sau 20'";
                        color = "orange";
                        icon = "🟠";
                    } else {
                        label = "Đã xác nhận";
                        color = "green";
                        icon = "🟢";
                    }

                    return (
                        <span style={{ color }}>
                            {icon} {Math.round(cancelRate * 100)}% ({label})
                        </span>
                    );
                }

                return (
                    <span style={{ color: "#999", fontStyle: "italic" }}>
                        Bạn chưa bật cấu hình hoặc cấu hình chưa đủ Overbooking.
                    </span>
                );
            },
            sorter: (a, b) => a.tylehuy - b.tylehuy,
        },
        {
            title: "Thời gian tạo",
            dataIndex: "time",
            key: "time",
            render: (time) => <p>{formatDate(time)}</p>,
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) =>
                record.status === "PAID_PENDING_USE" && (
                    <Space direction="vertical">
                        <Button
                            type="primary"
                            onClick={() => handleUpdateStatus(record.id, "COMPLETED")}
                            style={{ backgroundColor: "#52c41a", border: "none", color: "#fff" }}
                        >
                            Hoàn thành
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => handleUpdateStatus(record.id, "CANCELLED")}
                            style={{ backgroundColor: "#f5222d", border: "none", color: "#fff" }}
                        >
                            Không hoàn thành
                        </Button>
                    </Space>
                ),
        },
    ];

    return (
        <div className={styles.orderOwnerWrapper}>
            <Breadcrumb style={{ marginBottom: 16 }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý đơn đặt</Breadcrumb.Item>
            </Breadcrumb>

            <Table
                className="order-owner-table"
                columns={columns}
                dataSource={dataRender}
                expandable={{ expandedRowRender: (record) => record.description }}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
                bordered
            />
        </div>
    );
}

export default OrderOwner;
