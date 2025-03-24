import { Breadcrumb, Button, Input, Pagination, Result } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import drinkLogo from "../../assets/images/drink.svg";
import drinkIncLogo from "../../assets/images/drinkinc.svg";
import foodLogo from "../../assets/images/food.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import menuImg from "../../assets/images/menu1.png";
import { deleteFood, duplicateFood, getFood, getFoodByCategory, searchFood } from "../../redux/features/foodSlice";
import MenuItem from "./components/MenuItem";
import StatisticCard from "./components/StatisticCard";
import "./MenuList.css";
import styles from "./style.module.css";
const { Search } = Input;

function MenuList_Owner() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [isSearching, setIsSearching] = useState(false);
    const [searchKeywords, setSearchKeywords] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const foodList = useSelector((state) => state.food);

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        setFoods(foodList.food);
    }, [foodList.food]);

    useEffect(() => {
        if (category) {
            dispatch(getFoodByCategory({ restaurantId: 72, categoryId: category }));
        } else {
            dispatch(getFood({ restaurantId: 72 }));
        }
    }, []);

    useEffect(() => {
        console.log("MENU CHUAN BI RENDER: ", foods);
    }, [foods]);

    const onSearch = () => {
        setIsSearching(true);
        dispatch(searchFood({ key: searchKeywords, restaurantId: 72 }));
    };

    const toMenuDetail = (id) => {
        navigate(`/owner/menu/${id}`);
    };

    const deleteMenu = (id) => {
        dispatch(deleteFood({ restaurantId: 72, foodId: id }));
    };

    const duplicateMenu = (id) => {
        dispatch(duplicateFood({ restaurantId: 72, foodId: id }));
    };

    const [titleBreadCrumb, setTitleBreadCrumb] = useState("Tất cả");

    useState(() => {
        if (!searchKeywords) {
            setIsSearching(false);
        }
    }, searchKeywords);

    useEffect(() => {
        if (searchKeywords) {
            setTitleBreadCrumb(searchKeywords);
        } else {
            setTitleBreadCrumb("Tất cả");
        }
    }, [searchKeywords]);

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <Search
                    placeholder="Nhập tên món cần tìm..."
                    onSearch={onSearch}
                    onChange={(e) => setSearchKeywords(e.target.value)}
                    enterButton
                    style={{ padding: "12px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 12px" }}>
                    <Breadcrumb
                        style={{ margin: "8px" }}
                        items={[
                            {
                                title: "Danh sách món ăn",
                            },
                            {
                                title: titleBreadCrumb,
                            },
                        ]}
                    />
                    <Button
                        type="primary"
                        icon={<IoIosAddCircleOutline />}
                        color="cyan"
                        onClick={() => navigate("/owner/menu/add")}
                    >
                        Thêm món ăn
                    </Button>
                </div>
                <div className={styles["menu-wrap"]}>
                    <div className={styles["menu-list"]}>
                        {foods ? (
                            foods.map((food, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        menuName={food.ten}
                                        category={food.danhMuc?.ten}
                                        img={menuImg}
                                        viewClick={() => toMenuDetail(food.maSoMonAn)}
                                        deleteClick={() => deleteMenu(food.maSoMonAn)}
                                        duplicateClick={() => duplicateMenu(food.maSoMonAn)}
                                    />
                                );
                            })
                        ) : (
                            <div className={styles["not-found"]}>
                                <Result
                                    style={{ textAlign: "center" }}
                                    status="404"
                                    title="404"
                                    subTitle="Xin lỗi, Không tìm thấy món ăn!"
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.pagination}>
                        {foods && (
                            <Pagination
                                defaultCurrent={1}
                                total={foods ? foods.length : 0}
                                pageSize={8}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.statistics}>
                <StatisticCard
                    title="Tổng số món ăn"
                    quantity={foods ? foods.length : 0}
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
