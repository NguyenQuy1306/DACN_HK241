import React, { useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";
import { Breadcrumb, Table } from "antd";
import { Input } from "antd";
import MenuInOrder from "./MenuInOrder";
const { Search } = Input;
function OrderOwner() {
    const [collapsed, setCollapsed] = useState(false);
    const onSearch = () => {
        console.log("onSearch");
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
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Tổng tiền",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Ngày tạo",
            dataIndex: "time",
            key: "time",
        },
    ];

    const data = [
        {
            stt: 1,
            id: 2491,
            key: 1,
            name: "Nguyễn Quốc Nhựt",
            status: "Đã xác nhận",
            price: 199000,
            description: <MenuInOrder />,
            time: "12-03-2025 14:21:21",
        },
        {
            stt: 2,
            id: 2493,
            key: 2,
            name: "Nguyễn Ngọc Qúy",
            status: "Đã xác nhận",
            price: 399000,
            description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
            time: "12-03-2025 14:21:21",
        },
        {
            stt: 3,
            id: 2493,
            key: 3,
            name: "Nguyễn Kim Huệ",
            status: "Đã chờ",
            price: 549000,
            description: "This not expandable",
            time: "12-03-2025 14:21:21",
        },
        {
            stt: 4,
            id: 2494,
            key: 4,
            name: "Lâm Thành An",
            status: "Đã hủy",
            price: 359000,
            description: "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
            time: "12-03-2025 14:21:21",
        },
    ];

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
                    dataSource={data}
                />
            </div>
        </div>
    );
}

export default OrderOwner;
