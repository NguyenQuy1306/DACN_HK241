import React, { useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";
import StatisticCard from "../MenuList_Owner/components/StatisticCard";
import foodLogo from "../../assets/images/food.svg";
import drinkLogo from "../../assets/images/drink.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import drinkIncLogo from "../../assets/images/drinkinc.svg";
import { Input, Breadcrumb, Pagination } from "antd";
import CategoryItem from "./components/CategoryItem";
import hamberger from "../../assets/images/hamburger.jpg";
const { Search } = Input;
function CategoryOwner() {
    const [collapsed, setCollapsed] = useState(false);
    const onSearch = () => {
        console.log("onSearch");
    };

    return (
        <div className={styles.container}>
            {/* <SidebarOwner collapsed={collapsed} /> */}
            <div className={styles.body}>
                <Search
                    placeholder="Input name of category to search"
                    onSearch={onSearch}
                    enterButton
                    style={{ marginTop: "12px" }}
                />

                <Breadcrumb
                    style={{ margin: "8px" }}
                    items={[
                        {
                            title: "Danh mục món ăn",
                        },
                        {
                            title: "Tất cả",
                        },
                    ]}
                />

                <div className={styles["category-list"]}>
                    <CategoryItem
                        img={hamberger}
                        name="Sandwich"
                        quantity={8}
                        minPrice={45000}
                        maxPrice={89000}
                    />
                    <CategoryItem
                        img={hamberger}
                        name="Sandwich"
                        quantity={8}
                        minPrice={45000}
                        maxPrice={89000}
                    />
                    <CategoryItem
                        img={hamberger}
                        name="Sandwich"
                        quantity={8}
                        minPrice={45000}
                        maxPrice={89000}
                    />
                    <CategoryItem
                        img={hamberger}
                        name="Sandwich"
                        quantity={8}
                        minPrice={45000}
                        maxPrice={89000}
                    />
                    <CategoryItem
                        img={hamberger}
                        name="Sandwich"
                        quantity={8}
                        minPrice={45000}
                        maxPrice={89000}
                    />
                    <CategoryItem
                        img={hamberger}
                        name="Sandwich"
                        quantity={8}
                        minPrice={45000}
                        maxPrice={89000}
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

export default CategoryOwner;
