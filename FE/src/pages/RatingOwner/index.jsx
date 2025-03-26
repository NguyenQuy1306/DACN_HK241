import React, { useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";
import { Breadcrumb, Image, Table } from "antd";
import { Input } from "antd";

import avt from "../../assets/images/manga.jpg";
const { Search } = Input;
function RatingOwner() {
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
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avatar",
            key: "avatar",
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            key: "rating",
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
        },
    ];

    const data = [
        {
            stt: 1,
            key: 1,
            name: "Nguyễn Quốc Nhựt",
            rating: "10/10",
            avatar: (
                <Image
                    width={50}
                    height={50}
                    src="error"
                    fallback={avt}
                />
            ),
            comment: "Quán rất ngon, không gian quán sạch sẽ, thoáng mát",
            time: "12-03-2025 14:21:21",
        },
        {
            stt: 2,
            key: 1,
            name: "Nguyễn Ngọc Quý",
            rating: "9/10",
            avatar: (
                <Image
                    width={50}
                    height={50}
                    src="error"
                    fallback={avt}
                />
            ),
            comment: "Quán rất ngon, không gian quán sạch sẽ, thoáng mát",
            time: "12-03-2025 14:21:21",
        },
    ];

    return (
        <div className={styles.container}>
            <SidebarOwner collapsed={collapsed} />
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
                            title: "Danh sách đánh giá",
                        },
                        {
                            title: "Tất cả",
                        },
                    ]}
                />

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
            </div>
        </div>
    );
}

export default RatingOwner;
