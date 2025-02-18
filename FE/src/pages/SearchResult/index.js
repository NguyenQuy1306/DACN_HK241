import React, { useState, useEffect } from "react";
import { Star, Navigation2 } from "lucide-react";
import styles from "./RestaurantCard.module.css"; // Import the CSS module
import List from "../../components/List/List";
import Map from "../../components/Map/Map";
import Reservation from "../../components/Dropdown/Reservation";
import Filter from "../../components/Filter/Filter";
import ResultSearch from "../../components/Search/Result/ResultSearch";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
import SortIcon from "@mui/icons-material/Sort";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import SortDetail from "../../components/Sort/SortDetail";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
const RestaurantCard = ({ restaurant }) => {
  return (
    <div className={styles.restaurantCard}>
      <div className={styles.imageContainer}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={styles.restaurantImage}
        />
        {restaurant.discount && (
          <div className={styles.discountBadge}>Giảm {restaurant.discount}</div>
        )}
      </div>

      <div className={styles.restaurantDetails}>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.restaurantAddress}>{restaurant.address}</p>

        <div className="flex items-center gap-2 mb-2">
          <div className={styles.rating}>
            <Star className={styles.starIcon} />
            <span className="text-sm">{restaurant.rating}</span>
          </div>
          <span className={styles.priceLevel}>
            {"$".repeat(restaurant.priceLevel)}
          </span>
          <div className={styles.distance}>
            <Navigation2 className={styles.distanceIcon} />
            <span className="text-sm">{restaurant.distance} km</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={styles.restaurantCategory}>
            {restaurant.category}
          </span>
          <button className={styles.bookButton}>Đặt chỗ</button>
        </div>
      </div>
    </div>
  );
};

const RestaurantGrid = () => {
  const restaurants = [
    {
      name: "Phở 79 - Sương Nguyệt Ánh",
      address: "79 Sương Nguyệt Ánh, P. Bến Thành, Q. 1",
      image: "https://placehold.co/400x300",
      rating: 4.5,
      priceLevel: 2,
      distance: 0.63,
      category: "Gọi món Việt",
      status: "Đặt bàn được giữ chỗ",
    },
    {
      name: "Phở 79 - Sương Nguyệt Ánh",
      address: "79 Sương Nguyệt Ánh, P. Bến Thành, Q. 1",
      image: "https://placehold.co/400x300",
      rating: 4.5,
      priceLevel: 2,
      distance: 0.63,
      category: "Gọi món Việt",
      status: "Đặt bàn được giữ chỗ",
    },
    {
      name: "Phở 79 - Sương Nguyệt Ánh",
      address: "79 Sương Nguyệt Ánh, P. Bến Thành, Q. 1",
      image: "https://placehold.co/400x300",
      rating: 4.5,
      priceLevel: 2,
      distance: 0.63,
      category: "Gọi món Việt",
      status: "Đặt bàn được giữ chỗ",
    },
    {
      name: "Phở 79 - Sương Nguyệt Ánh",
      address: "79 Sương Nguyệt Ánh, P. Bến Thành, Q. 1",
      image: "https://placehold.co/400x300",
      rating: 4.5,
      priceLevel: 2,
      distance: 0.63,
      category: "Gọi món Việt",
      status: "Đặt bàn được giữ chỗ",
    },
    {
      name: "Phở 79 - Sương Nguyệt Ánh",
      address: "79 Sương Nguyệt Ánh, P. Bến Thành, Q. 1",
      image: "https://placehold.co/400x300",
      rating: 4.5,
      priceLevel: 2,
      distance: 0.63,
      category: "Gọi món Việt",
      status: "Đặt bàn được giữ chỗ",
    },
    {
      name: "Phở 79 - Sương Nguyệt Ánh",
      address: "79 Sương Nguyệt Ánh, P. Bến Thành, Q. 1",
      image: "https://placehold.co/400x300",
      rating: 4.5,
      priceLevel: 2,
      distance: 0.63,
      category: "Gọi món Việt",
      status: "Đặt bàn được giữ chỗ",
    },
    // Add more restaurant data here...
  ];
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.paramKeywordSearch);
  return (
    <>
      <SearchBar></SearchBar>
      <div
        style={{
          height: "68px",
          background: "white",
          borderBottom: "1px solid #eaeaea",
          position: "sticky",
          zIndex: 15,
          top: "0",
          boxShadow: "-0.0625rem 0.1875rem 0.375rem hsla(0, 0%, 0%, 0.12)",
        }}
      >
        <div
          style={{
            listStyleType: "none",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1rem",
            maxWidth: "80rem",
          }}
        >
          <div
            style={{
              listStyleType: "none",
              display: "flex",
            }}
          >
            <Reservation />
            <Filter />
          </div>
          <div>bbbádaaa</div>
        </div>
      </div>
      <ResultSearch keyword={keyword}></ResultSearch>
      <div className={styles.container}>
        <div className={styles.grid}>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantGrid;
