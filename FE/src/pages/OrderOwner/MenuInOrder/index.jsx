import React from "react";
import styles from "./style.module.css";
import { Image, Table } from "antd";
import bundau from "../../../assets/images/bundau.jpg";
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
    return (
        <div className={styles.container}>
            <Table
                columns={columns}
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
                <p>Mã giảm giá: </p>
                <span>10% đơn hàng</span>
            </div>
            <div className={styles.totalPrice}>
                <p style={{ marginRight: "32px" }}>Tổng: </p>
                <span>440.000đ</span>
            </div>
        </div>
    );
}

export default MenuInOrder;
