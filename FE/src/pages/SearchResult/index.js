import React, { useState, useEffect } from "react";
import { Star, Navigation2 } from "lucide-react";
import styles from "./RestaurantCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openModalSearch2 } from "../../redux/features/searchSlice";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
import Reservation from "../../components/Dropdown/Reservation";
import Filter from "../../components/Filter/Filter";
import ResultSearch from "../../components/Search/Result/ResultSearch";
import ButtonBooking from "../../components/Button/ButtonBooking/ButtonBooking";
// Function to convert degrees to radians
const toRadians = (degrees) => (degrees * Math.PI) / 180;

// Function to calculate distance
export const calculateDistance = (myCoords, restaurantCoords) => {
  if (
    !myCoords?.latitude ||
    !myCoords?.longitude ||
    !restaurantCoords?.lat ||
    !restaurantCoords?.lng
  ) {
    return null;
  }

  const R = 6371; // Earth's radius in km
  const lat1 = toRadians(myCoords.latitude);
  const lon1 = toRadians(myCoords.longitude);
  const lat2 = toRadians(restaurantCoords.lat);
  const lon2 = toRadians(restaurantCoords.lng);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(Math.round(R * c * 100) / 100, 0.01); // Return distance with 2 decimal places
};

const RestaurantCard = ({ restaurant }) => {
  const handleClickDetailRestaurant = async (id) => {
    localStorage.setItem("selectedPlace", JSON.stringify(restaurant));
    localStorage.setItem("selectedPlaceId", JSON.stringify(id));
    window.open("/DetailRestaurant/${id}", "_blank");
  };
  return (
    <div
      className={styles.restaurantCard}
      onClick={() => handleClickDetailRestaurant(restaurant.maSoNhaHang)}
    >
      <div className={styles.imageContainer}>
        <img
          src={
            restaurant.imageUrls["RESTAURANTIMAGE"] != null
              ? restaurant.imageUrls["RESTAURANTIMAGE"][0]
              : "https://placehold.co/400x300"
          }
          alt={restaurant.ten}
          className={styles.restaurantImage}
        />
        {restaurant.discount && (
          <div className={styles.discountBadge}>Giảm {restaurant.discount}</div>
        )}
      </div>

      <div className={styles.restaurantDetails}>
        <h3 className={styles.restaurantName}>{restaurant.ten}</h3>
        <p className={styles.restaurantAddress}>{restaurant.diaChi}</p>

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
            <span className="text-sm">
              {calculateDistance(
                { longitude: 106.6983125, latitude: 10.7802256 },
                {
                  lat: restaurant.viDo,
                  lng: restaurant.kinhDo,
                }
              )?.toFixed(2)}{" "}
              km
            </span>{" "}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={styles.restaurantCategory}>
            {restaurant.category}
          </span>
          <ButtonBooking text={"Đặt chỗ"}></ButtonBooking>
        </div>
      </div>
    </div>
  );
};

const RestaurantGrid = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.paramKeywordSearch);
  const restaurantSearch = useSelector(
    (state) => state.search.restaurantsSearch
  );
  const openOf2 = useSelector(openModalSearch2);
  const [temp_restaurantSearch, setTempRestaurantSearch] = useState([]);

  useEffect(() => {
    if (!openOf2) {
      setTempRestaurantSearch(restaurantSearch.slice());
    }
  }, [openOf2, restaurantSearch]);

  // Sort restaurants by distance
  const sortedRestaurants = [...temp_restaurantSearch].sort((a, b) => {
    const distanceA =
      calculateDistance(
        { longitude: 106.6983125, latitude: 10.7802256 },
        { lat: a.viDo, lng: a.kinhDo }
      ) || Infinity;
    const distanceB =
      calculateDistance(
        { longitude: 106.6983125, latitude: 10.7802256 },
        { lat: b.viDo, lng: b.kinhDo }
      ) || Infinity;
    return distanceA - distanceB; // Sort ascending
  });

  return (
    <>
      <SearchBar />
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
          <div style={{ listStyleType: "none", display: "flex" }}>
            <Reservation />
            <Filter />
          </div>
        </div>
      </div>
      <ResultSearch keyword={keyword} count={restaurantSearch.length} />
      <div className={styles.container}>
        <div className={styles.grid}>
          {sortedRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

// Export components
export { RestaurantGrid, RestaurantCard };
export default RestaurantGrid;
