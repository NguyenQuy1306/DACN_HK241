import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";
import MenuItem from "./components/MenuItem";
import menuImg from "../../assets/images/menu1.png";
import { Pagination } from "antd";
import { Input } from "antd";
import { Breadcrumb } from "antd";
import StatisticCard from "./components/StatisticCard";
import foodLogo from "../../assets/images/food.svg";
import drinkLogo from "../../assets/images/drink.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import drinkIncLogo from "../../assets/images/drinkinc.svg";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "../../redux/features/foodSlice";
const { Search } = Input;

function MenuList_Owner() {
    const [foods, setFoods] = useState([]);
    const dispatch = useDispatch();

    const foodList = useSelector((state) => state.food);

    useEffect(() => {
        setFoods(...foods, ...foodList.food);
    }, [foodList.food]);

    useEffect(() => {
        dispatch(getFood({ restaurantId: 72 }));
    }, []);

    useEffect(() => {
        console.log("DANH SACH MON AN: ", foods);
    }, [foods]);

    const [collapsed, setCollapsed] = useState(false);
    const onSearch = () => {
        console.log("Searching...");
    };
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <Search
                    placeholder="Input name of menu to search"
                    onSearch={onSearch}
                    enterButton
                    style={{ marginTop: "12px" }}
                />
                <Breadcrumb
                    style={{ margin: "8px" }}
                    items={[
                        {
                            title: "Danh sách món ăn",
                        },
                        {
                            title: "Tất cả",
                        },
                    ]}
                />

                <div className={styles["menu-list"]}>
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                    <MenuItem
                        menuName="Salad hoa quả"
                        category="Thức ăn/Salad"
                        img={menuImg}
                    />
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        defaultCurrent={1}
                        total={50}
                    />
                </div>
            </div>
            <div className={styles.statistics}>
                <StatisticCard
                    title="Tổng số món ăn"
                    quantity={45}
                    img={foodLogo}
                />
                <StatisticCard
                    title="Tổng số thức uống"
                    quantity={12}
                    img={drinkLogo}
                />
                <StatisticCard
                    title="Món ăn bán chạy nhất"
                    quantity={"Lẩu gà Bình Thuận"}
                    img={foodIncLogo}
                />
                <StatisticCard
                    title="Thức uống bán chạy nhất"
                    quantity={"Trà mãng cầu"}
                    img={drinkIncLogo}
                />
            </div>
        </div>
    );
}

export default MenuList_Owner;
