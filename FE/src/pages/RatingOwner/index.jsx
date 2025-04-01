import { Button, Image, Rate, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import { useDispatch, useSelector } from "react-redux";
import avt from "../../assets/images/manga.jpg";
import { getRateInRestaurant } from "../../redux/features/rateSlice";
import Authentication from "./../../features/Authentication/Authentication";

function RatingOwner() {
    const { rate } = useSelector((state) => state.rate);
    const { restaurantOwner } = useSelector((state) => state.authentication);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: "center",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avatar",
            key: "avatar",
            align: "center",
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            key: "rating",
            render: (_, record) => {
                return (
                    <Rate
                        allowHalf
                        disabled
                        defaultValue={record.rating}
                    />
                );
            },
        },
        {
            title: "Nhận xét",
            dataIndex: "comment",
            key: "comment",
        },
        {
            title: "Ngày tạo",
            dataIndex: "time",
            key: "time",
            align: "center",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <div className={styles.actions}>
                    <Button
                        className={styles.detail}
                        onClick={() => {
                            console.log("edit", record.key);
                        }}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        className={styles.action}
                        danger
                        onClick={() => {
                            console.log("delete", record.key);
                        }}
                    >
                        Ẩn đánh giá
                    </Button>
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
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const user = useSelector((state) => state.authentication.restaurantOwner);
    useEffect(() => {
        console.log("User information: ", user);
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRateInRestaurant({ restaurantId: restaurantOwner?.maSoNhaHang }));
    }, []);

    useEffect(() => console.log("RATE LIST: ", rate), []);
    const [rateDate, setRateData] = useState([]);

    useEffect(() => {
        if (rate) {
            const data = rate.map((item, index) => {
                return {
                    stt: index + 1,
                    key: index,
                    name: item.userRateResponses.hoTen,
                    rating: item.sao,
                    avatar: (
                        <Image
                            width={50}
                            height={50}
                            src="error"
                            fallback={avt}
                        />
                    ),
                    comment: item.noiDung,
                    time: formatLocalDateTime(item.thoiGianCapNhat),
                };
            });
            setRateData(data);
        }
    }, [rate]);

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <Table
                    columns={columns}
                    dataSource={rateDate}
                />
            </div>
        </div>
    );
}

export default RatingOwner;
