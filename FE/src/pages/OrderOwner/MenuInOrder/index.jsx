import React from "react";
import styles from "./style.module.css";
import { Image, Table } from "antd";
import bundau from "../../../assets/images/bundau.jpg";
import "./MenuInOrder.css";
function MenuInOrder() {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Ảnh",
            dataIndex: "img",
            key: "img",
        },
        {
            title: "Món ăn",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            render: (price) => {
                return <p style={{ color: "#d61a1a" }}>{formatCurrency(price)}</p>;
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Khuyến mãi",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price) => {
                return <p style={{ color: "#d61a1a" }}>{formatCurrency(price)}</p>;
            },
        },
    ];

    const data = [
        {
            stt: 1,
            key: 1,
            name: "Bún đậu mắm tôm",
            price: 89000,
            quantity: 1,
            discount: 0,
            totalPrice: 89000,
            img: (
                <Image
                    width={50}
                    height={50}
                    src="error"
                    fallback={bundau}
                />
            ),
        },
        {
            stt: 1,
            key: 1,
            name: "Bún đậu mắm tôm",
            price: 89000,
            quantity: 1,
            discount: 0,
            totalPrice: 89000,
            img: (
                <Image
                    width={50}
                    height={50}
                    src="error"
                    fallback={bundau}
                />
            ),
        },
    ];
    const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        })
            .format(value)
            .replace("₫", "đ");
    };
    return (
        <div className={styles.container}>
            <h3 style={{ textAlign: "center" }}>Chi tiết đơn đặt bàn</h3>
            <Table
                columns={columns}
                className="detail-order-table"
                // expandable={{
                //     expandedRowRender: (record) => (
                //         <p
                //             style={{
                //                 margin: 0,
                //             }}
                //         >
                //             {record.description}
                //         </p>
                //     ),
                //     rowExpandable: (record) => record.name !== "Not Expandable",
                // }}
                dataSource={data}
            />
            <div className={styles.discount}>
                <p style={{ marginRight: "60px", color: "rgb(0,102,92)" }}>Giảm giá: </p>
                <span>10% </span>
            </div>
            <div className={styles.totalPrice}>
                <p style={{ marginRight: "32px", color: "rgb(0,102,92)" }}>Tổng thanh toán: </p>
                <span style={{ color: "#d61a1a" }}>440.000đ</span>
            </div>
        </div>
    );
}

export default MenuInOrder;
