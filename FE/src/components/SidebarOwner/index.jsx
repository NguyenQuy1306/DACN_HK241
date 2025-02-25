import React, { useState } from "react";
import styles from "./style.module.css";
import logo from "../../assets/images/logo-mini.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { MdOutlineTableRestaurant } from "react-icons/md";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
const items = [
    {
        key: "1",
        icon: <LuLayoutDashboard />,
        label: "Dashboard",
    },
    {
        key: "2",
        icon: <MdOutlineLibraryBooks />,
        label: "Orders",
    },

    {
        key: "sub1",
        label: "Menu",
        icon: <BiFoodMenu />,
        children: [
            {
                key: "5",
                label: "Thêm món ăn",
            },
            {
                key: "6",
                label: "Danh sách món ăn",
            },
            {
                key: "7",
                label: "Danh mục món ăn",
            },
        ],
    },
    {
        key: "4",
        icon: <GoCommentDiscussion />,
        label: "Rating",
    },
    {
        key: "5",
        icon: <MdOutlineTableRestaurant />,
        label: "General",
    },
];
const SidebarOwner = ({ collapsed }) => {
    return (
        <div
        // style={{
        //     width: 256,
        // }}
        >
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="night"
                inlineCollapsed={collapsed}
                items={items}
                style={{ backgroundColor: "#1c451c", color: "#fff", height: "100%", fontSize: 16 }}
            />
        </div>
    );
};
export default SidebarOwner;
