import React from "react";
import styles from "./style.module.css";
import { Image, Table } from "antd";
import bundau from "../../../assets/images/bundau.jpg";
import "./MenuInOrder.css";
function MenuInOrder({ menu }) {
    const totalDiscount = 10;
    console.log("SUBMENU: ", menu);
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
            title: "Khuyến mãi (%)",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Tổng tiền",
            // dataIndex: "totalPrice",
            key: "totalPrice",
            render: (row, price) => {
                return (
                    <p style={{ color: "#d61a1a" }}>
                        {formatCurrency((row.price - (row.discount / 100) * row.price) * row.quantity)}
                    </p>
                );
            },
        },
    ];

    const data =
        // {
        //     stt: 1,
        //     key: 1,
        //     name: "Bún đậu mắm tôm",
        //     price: 89000,
        //     quantity: 2,
        //     discount: 3,
        //     img: (
        //         <Image
        //             width={50}
        //             height={50}
        //             src="error"
        //             fallback={bundau}
        //         />
        //     ),
        // },
        menu.map((item, index) => {
            return {
                stt: index + 1,
                key: index + 1,
                name: item.tenMon,
                price: item.gia,
                quantity: item.soLuong,
                discount: 0,
                img: (
                    <Image
                        width={50}
                        height={50}
                        src="error"
                        fallback={bundau}
                    />
                ),
            };
        });
    const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        })
            .format(value)
            .replace("₫", "đ");
    };
    const totalCost = data.reduce((acc, cur) => {
        return acc + (cur.price - (cur.discount / 100) * cur.price) * cur.quantity;
    }, 0);

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
                <p style={{ marginRight: "40px", color: "rgb(0,102,92)" }}>Giảm giá(%): </p>
                <span>{totalDiscount} </span>
            </div>
            <div className={styles.totalPrice}>
                <p style={{ marginRight: "32px", color: "rgb(0,102,92)" }}>Tổng thanh toán: </p>
                <span style={{ color: "#d61a1a" }}>
                    {formatCurrency(totalCost - totalCost * (totalDiscount / 100))}
                </span>
            </div>
        </div>
    );
}

export default MenuInOrder;
