import { Breadcrumb, Button, Input, Space, Table, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MenuInOrder from "./MenuInOrder";
import styles from "./style.module.css";
import "./OrderOwner.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByRestaurantId } from "./../../redux/features/orderSlice";
import { format } from "date-fns";
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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
            title: "Ngày",
            dataIndex: "date",
            key: "date",
            render: (_, { date }) => {
                return <p>{formatDate(date)}</p>;
            },
        },
        {
            title: "Giờ",
            dataIndex: "timezone",
            key: "timezone",
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
                }
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
            // dataIndex: "remain",
            key: "remain",
            render: (row) => {
                return <p style={{ color: "#d61a1a" }}>{formatCurrency(row.price - row.prePay)}</p>;
            },
        },
        {
            title: "Thời gian tạo",
            dataIndex: "time",
            key: "time",
        },
    ];

    const dispatch = useDispatch();
    const orderSlice = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getAllOrderByRestaurantId({ restaurantId: 72 }));
    }, []);

    useEffect(() => {
        console.log("ORDER LIST: ", orderSlice?.order);
    }, [orderSlice.order]);

    const data = [
        {
            stt: 1,
            id: "VKZ2491",
            key: 1,
            name: "Nguyễn Quốc Nhựt",
            status: "Đã hoàn thành",
            price: 199000,
            description: <MenuInOrder />,
            time: "12-03-2025 14:21:21",
        },
    ];

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
                    description: (
                        <MenuInOrder
                            menu={order.danhSachMonAn.length > 0 ? order.danhSachMonAn : order.danhSachCombo}
                        />
                    ),
                    time: "12-03-2025 14:21:21",
                    timezone: order.gio,
                    date: order.ngay,
                    quantity: order.soKhach,
                    remain: 500000,
                    prePay: Number(order.tienCoc) || 0, // Đảm bảo `tienCoc` không bị NaN
                };
            }),
        );
    }, [orderSlice.order]);

    useEffect(() => {
        console.log("DATA RENDER: ", dataRender);
    }, [dataRender]);

    return (
        <div className={styles.container}>
            {/* <SidebarOwner collapsed={collapsed} /> */}
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
