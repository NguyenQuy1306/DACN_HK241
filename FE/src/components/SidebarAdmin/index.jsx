import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineTableRestaurant } from "react-icons/md";
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
    icon: <MdOutlineTableRestaurant />,
    label: "Partners",
  },
  // {
  //     key: "3",
  //     icon: <MdOutlineTableRestaurant />,
  //     label: "Partners",
  // },
  // {
  //     key: "4",
  //     icon: <MdOutlineTableRestaurant />,
  //     label: "Partners",
  // },
];
const SidebarAdmin = ({ collapsed }) => {
  const navigate = useNavigate();
  const [navKey, setNavKey] = useState(1);
  useEffect(() => {
    if (navKey === 1) {
      navigate("/admin/dashboard");
    }
  }, [navKey]);

  const handleMenuClick = ({ key }) => {
    setNavKey(key);
    switch (key) {
      case "1":
        navigate("/admin/dashboard");
        break;
      case "2":
        navigate("/admin/partner");
        break;
      default:
        break;
    }
  };

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

export default SidebarAdmin;
