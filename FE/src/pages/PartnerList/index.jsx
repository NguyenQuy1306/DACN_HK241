import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRestaurant } from "../../redux/api";
import { getRestaurantId } from "./../../redux/features/restaurantSlice";

function PartnerList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "stt",
            align: "center",
        },
        {
            title: "Mã số nhà hàng",
            dataIndex: "maSoNhaHang",
            key: "id",
            align: "center",
        },
        {
            title: "Tên nhà hàng",
            dataIndex: "ten",
            key: "name",
            align: "center",
        },
        {
            title: "Địa chỉ",
            dataIndex: "diaChi",
            key: "address",
            align: "center",
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            key: "status",
            render: (text, record) => {
                if (text) {
                    let color = text.length > 5 ? "green" : "brown";
                    if (text === "pending") {
                        color = "blue";
                    } else if (text === "inactive") {
                        color = "red";
                    }
                    return (
                        <Tag
                            color={color}
                            key={text}
                        >
                            {text.toUpperCase()}
                        </Tag>
                    );
                } else {
                    return;
                }
            },
        },
        // {
        //     title: "Nhận xét",
        //     dataIndex: "comment",
        //     key: "comment",
        // },
        {
            title: "Ngày tham gia",
            dataIndex: "ngayThamGia",
            key: "time",
            align: "center",
            render: (text) => {
                return formatLocalDateTime(text);
            },
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <div className={styles.actions}>
                    <Button
                        className={styles.detail}
                        onClick={() => {
                            dispatch(getRestaurantId({ id: record.maSoNhaHang }));
                            navigate(`/admin/ownerdetail/${record.maSoNhaHang}`);
                        }}
                    >
                        Chi tiết
                    </Button>
                    {/* <Button
                        className={styles.action}
                        danger
                        onClick={() => {
                            console.log("delete", record.key);
                        }}
                    >
                        Ẩn đánh giá
                    </Button> */}
                </div>
            ),
        },
    ];
    const formatLocalDateTime = (localDateTime) => {
        if (!localDateTime) return ""; // Tránh lỗi nếu dữ liệu null hoặc undefined

        const date = new Date(localDateTime);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    const [loading, setLoading] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            setLoading(true);
            try {
                const ls = await getAllRestaurant();
                console.log("ls", Array.isArray(ls.payload));

                // Transform data to include unique keys for the table
                const transformedData = ls.payload.map((item, index) => ({
                    ...item,
                    key: index + 1, // Add a unique key for each row
                }));

                setRestaurantList(transformedData);
            } catch (error) {
                console.error("Failed to fetch restaurants:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        getRestaurants();
    }, []);

    useEffect(() => {
        console.log("Restaurant list: ", restaurantList);
    }, [restaurantList]);

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <Table
                    columns={columns}
                    dataSource={restaurantList}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default PartnerList;
