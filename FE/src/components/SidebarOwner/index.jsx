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
import { useNavigate } from "react-router-dom";
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
        key: "8",
        icon: <GoCommentDiscussion />,
        label: "Rating",
    },
    {
        key: "9",
        icon: <MdOutlineTableRestaurant />,
        label: "General",
    },
];
const SidebarOwner = ({ collapsed }) => {
    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case "1":
                navigate("/owner/dashboard");
                break;
            case "2":
                navigate("/owner/orders");
                break;
            case "5":
                navigate("/owner/menu/add");
                break;
            case "6":
                navigate("/owner/menu/list");
                break;
            case "7":
                navigate("/owner/menu/categories");
                break;
            case "4":
                navigate("/owner/rating");
                break;
            case "5":
                navigate("/owner/general");
                break;
            default:
                break;
        }
    };

    return (
        <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className={styles["menu-container"]}
        onClick={handleMenuClick}
    />
    
    );
};

export default SidebarOwner;

