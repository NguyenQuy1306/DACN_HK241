import React, { useEffect, useState } from "react";
import "./Menu.css";
import CardMenuAvailable from "./Component/CardMenuAvailable/CardMenuAvailable";
import ButtonMenuNavBar from "./Component/ButtonMenuNavBar/ButtonMenuNavBar";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import QuantityInput from "./Component/ButtonIncrement/ButtonIncrement";
import BasicModal from "./Component/ModalMenu/ModalMenu";
import { useSelector, useDispatch } from "react-redux";
import { getFood } from "../../../../../redux/features/foodSlice";
import CloseIcon from "@mui/icons-material/Close";
import { setActiveTabMenu } from "../../../../../redux/features/navigationSlice";
const { formatCurrency } = require("../../../../../helper/helper");

const Menu = ({ selectedPlace }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const foodDatafromAPI = useSelector((state) => state.food.food);
  const menuDatafromAPI = useSelector((state) => state.combo.combo);
  const activeTabMenu = useSelector((state) => state.navigation.activeTabMenu);
  const handleOnClickImageMenu = () => {
    const location_id = localStorage.getItem("selectedPlaceId");
    navigate(`/DetailRestaurant/${location_id}/menuImages`);
  };

  const [newCombo, setNewCombo] = useState([]);
  const handleAddItem = (item, quantity) => {
    if (quantity > 0) {
      const existingItem = newCombo.find(
        (comboItem) => comboItem.item.ten === item.ten
      );
      if (existingItem) {
        setNewCombo((prev) =>
          prev.map((comboItem) =>
            comboItem.item.ten === item.ten
              ? { ...comboItem, quantity: quantity }
              : comboItem
          )
        );
      } else {
        // Add new item to newCombo
        setNewCombo((prev) => [...prev, { item, quantity }]);
      }
    }
  };
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const itemsPerPage = 2;
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentFoodItems = foodDatafromAPI.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: "hsl(174, 100%, 20%)",
      },
      secondary: {
        main: "#E0C2FF",
        light: "#F5EBFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#47008F",
      },
    },
  });
  const [resetNewMenu, setResetNewMenu] = useState(false);
  const handleResetNewMenu = () => {
    setResetNewMenu(true);
    setNewCombo([]);
  };

  return (
    <>
      <div className="MenuNavBarDiv">
        <div className="MenuNavBarDiv_H1">
          <div className="MenuNavBarDiv_H1_H2">
            <ButtonMenuNavBar
              text={"Các combo có sẵn"}
              selectedPlace={selectedPlace}
            />
            <ButtonMenuNavBar
              text={"Tất cả món ăn"}
              selectedPlace={selectedPlace}
            />
            <ButtonMenuNavBar
              text={"Tạo combo mới"}
              selectedPlace={selectedPlace}
            />
          </div>
        </div>
      </div>

      {activeTabMenu === "Các combo có sẵn" && (
        <div className="MenuNavBar_menu">
          <div className="MenuNavBar_menu_H1">
            <h3 className="MenuNavBar_menu_H1_h3">
              <span>Các combo hiện có</span>
            </h3>
            <p className="MenuNavBar_menu_H1_p">
              <span>
                Khám phá thực đơn lựa chọn của đầu bếp với nhiều món ăn đa dạng
                với mức giá cố định. Một số có thể đặt qua TheFork, trong khi
                những món khác có thể tạo combo hoặc sẵn tại chỗ.
              </span>
            </p>
            {menuDatafromAPI.map((menu, index) => (
              <CardMenuAvailable
                key={index}
                menu={menu}
                typeMenu={"available"}
              />
            ))}
          </div>
        </div>
      )}

      {activeTabMenu === "Tất cả món ăn" && (
        <div className="MenuNavBar_allfood">
          {selectedPlace.danhSachAnhMenu.map((menuImage, index) => {
            if (index < 8) {
              return (
                <div
                  key={index}
                  className="col-md-4 ImageAllFoodDiv"
                  onClick={() => handleOnClickImageMenu()}
                >
                  <img
                    src={menuImage}
                    alt={`Menu ${index + 1}`}
                    className="ImageAllFoodDiv_img"
                  />
                </div>
              );
            } else if (index === 8) {
              return (
                <div
                  key={index}
                  className="col-md-4 ImageAllFoodDiv"
                  onClick={() => handleOnClickImageMenu()}
                >
                  <div className="ImageAllFoodDiv_number8">
                    <div className="ImageAllFoodDiv_number8_H1">
                      <div className="ImageAllFoodDiv_number8_H1_div">+8</div>
                    </div>
                    <img
                      src={menuImage}
                      alt={`Menu ${index + 1}`}
                      className="ImageAllFoodDiv_img"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {activeTabMenu === "Tạo combo mới" && (
        <>
          <div className="MenuNavBar_createMenu">
            <Button
              className="menu-description_button"
              onClick={() => handleResetNewMenu()}
            >
              <RestartAltIcon className="modal-modal-description_button_icon"></RestartAltIcon>
              <span className="modal-modal-description_button_span">Reset</span>
            </Button>
            <div className="MenuNavBar_createMenu_div">
              {currentFoodItems.map((category, index) => (
                <div key={index} className="MenuNavBar_createMenu_div_index">
                  <h3 className="MenuNavBar_createMenu_div_index_H3">
                    {category.categoryResponse.ten}
                  </h3>
                  <ul>
                    {category.foodResponses.map((item, idx) => (
                      <li
                        className="MenuNavBar_createMenu_div_index_H3_li"
                        key={idx}
                      >
                        <span>{item.ten}</span>
                        <span className="MenuNavBar_createMenu_div_index_H3_span2">
                          {formatCurrency(item.gia)} đ
                        </span>

                        <QuantityInput
                          onQuantityChange={(quantity) =>
                            handleAddItem(item, quantity)
                          }
                          resetNewMenu={resetNewMenu}
                          setResetNewMenu={setResetNewMenu}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {/* <Button onClick={handleCreateCombo}>Tạo menu</Button> */}
              <div className="MenuNavBar_createMenu_div_pagination">
                <ThemeProvider theme={theme}>
                  <Pagination
                    count={Math.ceil(foodDatafromAPI.length / itemsPerPage)} // Calculate number of pages
                    page={currentPage} // Track current page
                    onChange={handlePageChange} // Handle page change
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                  />
                </ThemeProvider>
              </div>
              <BasicModal
                combo={newCombo}
                selectedPlace={selectedPlace}
              ></BasicModal>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
