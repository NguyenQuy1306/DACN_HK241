import React, { useState, useEffect } from "react";
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
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import "./Search.css";
import {
  getRestaurantsInMaps,
  saveCurrentPage,
} from "../../redux/features/restaurantSlice";
const Search = () => {
  const dispatch = useDispatch();
  const data_restaurantsImagesType = useSelector(
    (state) => state.restaurant.restaurantsImages
  );
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [coords, setCoords] = useState({
    lat: 10.77966437660912,
    lng: 106.66970825682756,
  });
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = useSelector((state) => state.restaurant.currentPage);

  // Function to handle place changes
  const onPlaceChanged = (autocomplete) => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };
  const [chooseRelevance, setChooseRelevance] = useState(true);
  const [chooseOffer, setChooseOffer] = useState(false);
  const [choosePrice, setChoosePrice] = useState(false);
  const [choosePopularity, setChoosePopularity] = useState(false);
  const [chooseNewRestaurant, setChooseNewRestaurant] = useState(false);
  const [openSort, SetOpenSort] = useState(false);
  const metadata = useSelector((state) => state.restaurant.metadata);
  const handleOnCloseSort = () => {
    SetOpenSort(!openSort);
  };
  const bounds = useSelector((state) => state.restaurant.bounds);
  const time = useSelector((state) => state.restaurant.time);
  const date = useSelector((state) => state.restaurant.date);
  const people = useSelector((state) => state.restaurant.people);
  useEffect(() => {
    if (!bounds) return;

    const { ne, sw } = bounds;

    const params = {
      bl_latitude: sw.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
      tr_latitude: ne.lat,
      page: currentPage,
      size: 10,
    };

    // Chỉ thêm các tham số `date`, `time`, `people` nếu chúng có giá trị
    if (time && date && people) {
      params.date = date;
      params.people = people;
      params.time = time;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("calllll");
    dispatch(getRestaurantsInMaps(params));
  }, [currentPage, time, date, people]);

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
      <ResultSearch
        keyword={""}
        count={metadata ? metadata.totalItems : 0}
      ></ResultSearch>

      <div className="listRestaurantDiv">
        <div className="listRestaurantDiv_H1">
          <div className="listRestaurantDiv_H1_left">
            <div className="listRestaurantDiv_H1_left_sort">
              <div className="listRestaurantDiv_H1_left_sort_div">
                <div className="listRestaurantDiv_H1_left_sort_div_div">
                  <div>
                    <Button
                      className="listRestaurantDiv_H1_left_sort_div_div_button"
                      onClick={handleOnCloseSort}
                    >
                      <div className="listRestaurantDiv_H1_left_sort_div_div_button_iconDiv">
                        <SortIcon className="listRestaurantDiv_H1_left_sort_div_div_button_iconDiv_icon"></SortIcon>
                      </div>
                      <span>
                        <span>Sort by</span>
                      </span>
                      <div className="listRestaurantDiv_H1_left_sort_div_div_button_iconDiv2">
                        <ExpandMoreIcon className="listRestaurantDiv_H1_left_sort_div_div_button_iconDiv_icon"></ExpandMoreIcon>
                      </div>
                    </Button>
                    {openSort && (
                      <div className="listRestaurantDiv_H1_left_sort_div_div_dropdown">
                        <div className="listRestaurantDiv_H1_left_sort_div_div_dropdown_title">
                          <div className="listRestaurantDiv_H1_left_sort_div_div_dropdown_title_name">
                            <h3>
                              <span>Sắp xếp</span>
                            </h3>
                          </div>
                        </div>
                        <div className="listRestaurantDiv_H1_left_sort_div_div_dropdown_list">
                          <div className="listRestaurantDiv_H1_left_sort_div_div_dropdown_list_div">
                            <div className="listRestaurantDiv_H1_left_sort_div_div_dropdown_list_div_H1">
                              <div>
                                <div>
                                  <SortDetail
                                    text="Liên quan"
                                    setChooseRelevance={setChooseRelevance}
                                    setChoosePrice={setChoosePrice}
                                    setChoosePopularity={setChoosePopularity}
                                    setChooseOffer={setChooseOffer}
                                    setChooseNewRestaurant={
                                      setChooseNewRestaurant
                                    }
                                    choosed={chooseRelevance}
                                  ></SortDetail>
                                  <SortDetail
                                    text="Menu"
                                    setChooseRelevance={setChooseRelevance}
                                    setChoosePrice={setChoosePrice}
                                    setChoosePopularity={setChoosePopularity}
                                    setChooseOffer={setChooseOffer}
                                    setChooseNewRestaurant={
                                      setChooseNewRestaurant
                                    }
                                    choosed={chooseOffer}
                                  ></SortDetail>
                                  <SortDetail
                                    text="Giá"
                                    setChooseRelevance={setChooseRelevance}
                                    setChoosePrice={setChoosePrice}
                                    setChoosePopularity={setChoosePopularity}
                                    setChooseOffer={setChooseOffer}
                                    setChooseNewRestaurant={
                                      setChooseNewRestaurant
                                    }
                                    choosed={choosePrice}
                                  ></SortDetail>
                                  <SortDetail
                                    text="Phổ biến"
                                    setChooseRelevance={setChooseRelevance}
                                    setChoosePrice={setChoosePrice}
                                    setChoosePopularity={setChoosePopularity}
                                    setChooseOffer={setChooseOffer}
                                    setChooseNewRestaurant={
                                      setChooseNewRestaurant
                                    }
                                    choosed={choosePopularity}
                                  ></SortDetail>
                                  <SortDetail
                                    text="Nhà hàng mới"
                                    setChooseRelevance={setChooseRelevance}
                                    setChoosePrice={setChoosePrice}
                                    setChoosePopularity={setChoosePopularity}
                                    setChooseOffer={setChooseOffer}
                                    setChooseNewRestaurant={
                                      setChooseNewRestaurant
                                    }
                                    choosed={chooseNewRestaurant}
                                  ></SortDetail>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
            <div className="pagination_search">
              <Pagination
                count={metadata ? metadata.totalPages : 1}
              ></Pagination>
            </div>
          </div>
          <div className="listRestaurantDiv_H1_right">
            <Map
              setPlaces={setPlaces}
              setCoords={setCoords}
              setChildClicked={setChildClicked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
