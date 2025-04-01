import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineLibraryBooks, MdOutlineTableRestaurant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
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
        key: "9",
        icon: <MdOutlineTableRestaurant />,
        label: "Thông tin nhà hàng",
    },
];
const SidebarOwner = ({ collapsed }) => {
    const navigate = useNavigate();
    const [navKey, setNavKey] = useState(1);
    const handleMenuClick = ({ key }) => {
        setNavKey(key);
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
            case "9":
                navigate("/owner/restaurant");
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (navKey === 1) {
            navigate("/owner/dashboard");
        }
    }, [navKey]);

    return (
        <div>
            <Menu
                style={{ minHeight: "calc(100vh - 66px)", height: "100%" }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                className={styles["menu-container"]}
                onClick={handleMenuClick}
            />
        </div>
    );
};

export default SidebarOwner;
