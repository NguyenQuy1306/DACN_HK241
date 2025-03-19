import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";
import MenuItem from "./components/MenuItem";
import menuImg from "../../assets/images/menu1.png";
import { Button, Pagination } from "antd";
import { Input } from "antd";
import { Breadcrumb } from "antd";
import StatisticCard from "./components/StatisticCard";
import foodLogo from "../../assets/images/food.svg";
import drinkLogo from "../../assets/images/drink.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import drinkIncLogo from "../../assets/images/drinkinc.svg";
import { useDispatch, useSelector } from "react-redux";
import { getFood, saveFoodDetail } from "../../redux/features/foodSlice";
import { deleteFood } from "../../redux/features/foodSlice";
import { searchFood } from "../../redux/features/foodSlice";
import { duplicateFood } from "../../redux/features/foodSlice";
import { useNavigate, useNavigation } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

const { Search } = Input;

function MenuList_Owner() {
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const foodList = useSelector((state) => state.food);

  const [foods, setFoods] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );
  useEffect(() => {
    setFoods(foodList.food);
  }, [foodList.food]);

  useEffect(() => {
    dispatch(getFood({ restaurantId: restaurantOwner.maSoNhaHang }));
  }, []);

  useEffect(() => {
    console.log("MENU CHUAN BI RENDER: ", foods);
  }, [foods]);

  const onSearch = () => {
    setIsSearching(true);
    dispatch(
      searchFood({
        key: searchKeywords,
        restaurantId: restaurantOwner.maSoNhaHang,
      })
    );
  };

  const toMenuDetail = (food) => {
    navigate(`/owner/menu/add`);
    dispatch(saveFoodDetail(food));
  };

  const deleteMenu = (id) => {
    dispatch(
      deleteFood({ restaurantId: restaurantOwner.maSoNhaHang, foodId: id })
    );
  };

  const duplicateMenu = (id) => {
    dispatch(
      duplicateFood({ restaurantId: restaurantOwner.maSoNhaHang, foodId: id })
    );
  };

  const titleBreadCrumb = isSearching ? searchKeywords : "Tất cả";

  useState(() => {
    if (!searchKeywords) {
      setIsSearching(false);
    }
  }, searchKeywords);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 12px",
          }}
        >
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
            onClick={() => navigate("./add")}
          >
            Thêm món ăn
          </Button>
        </div>

        <div className={styles["menu-list"]}>
          {foods &&
            foods.map((food, index) => {
              return (
                <MenuItem
                  key={index}
                  menuName={food.ten}
                  category={food.danhMuc?.ten}
                  img={menuImg}
                  viewClick={() => toMenuDetail(food)}
                  deleteClick={() => deleteMenu(food.maSoMonAn)}
                  duplicateClick={() => duplicateMenu(food.maSoMonAn)}
                />
              );
            })}
        </div>

        <div className={styles.pagination}>
          <Pagination defaultCurrent={1} total={foods.length} />
        </div>
      </div>
      <div className={styles.statistics}>
        <StatisticCard
          title="Tổng số món ăn"
          quantity={foods.length}
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
