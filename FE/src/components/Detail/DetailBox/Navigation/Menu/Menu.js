import React, { useState } from "react";
import "./Menu.css";
import CardMenuAvailable from "./Component/CardMenuAvailable/CardMenuAvailable";
import ButtonMenuNavBar from "./Component/ButtonMenuNavBar/ButtonMenuNavBar";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import QuantityInput from "./Component/ButtonIncrement/ButtonIncrement";
import BasicModal from "./Component/ModalMenu/ModalMenu";
const Menu = ({ selectedPlace }) => {
  let navigate = useNavigate();

  const menuAvailable = [
    {
      name: "Instant MICHELIN",
      price: 69000,
      availability: "Available from Jan 05 to Jan 05",
      type: "Temporary",
      details: [
        {
          category: "Các món soup",
          items: [
            "SÚP MĂNG TÂY CUA",
            "SÚP CUA VI CUA",
            "SÚP HẢI SẢN",
            "SÚP BÍ ĐỎ",
            "SÚP NẤM TƯƠI",
          ],
        },
        {
          category: "Các món khai vị",
          items: [
            "GỎI CUỐN TÔM THỊT",
            "NEM CUỐN RAU",
            "CHẢ GIÒ HẢI SẢN",
            "BÁNH XÈO NHỎ",
            "NEM NƯỚNG NHA TRANG",
          ],
        },
        {
          category: "Các món nướng",
          items: [
            "GỎI CUỐN TÔM THỊT",
            "NEM CUỐN RAU",
            "CHẢ GIÒ HẢI SẢN",
            "BÁNH XÈO NHỎ",
            "NEM NƯỚNG NHA TRANG",
          ],
        },
      ],
    },
  ];

  const foodData = [
    {
      category: "Các món soup",
      items: [
        { name: "SÚP MĂNG TÂY CUA", price: 500000 },
        { name: "SÚP CUA VI CUA", price: 550000 },
        { name: "SÚP HẢI SẢN", price: 600000 },
        { name: "SÚP BÍ ĐỎ", price: 450000 },
        { name: "SÚP NẤM TƯƠI", price: 480000 },
      ],
    },
    {
      category: "Các món khai vị",
      items: [
        { name: "GỎI CUỐN TÔM THỊT", price: 300000 },
        { name: "NEM CUỐN RAU", price: 280000 },
        { name: "CHẢ GIÒ HẢI SẢN", price: 320000 },
        { name: "BÁNH XÈO NHỎ", price: 400000 },
        { name: "NEM NƯỚNG NHA TRANG", price: 350000 },
      ],
    },
    {
      category: "Các món chính",
      items: [
        { name: "GÀ NƯỚNG MẬT ONG", price: 800000 },
        { name: "BÒ KHO", price: 900000 },
        { name: "CÁ HỒI SỐT CHANH DÂY", price: 1200000 },
        { name: "THỊT KHO TÀU", price: 850000 },
        { name: "LẨU HẢI SẢN", price: 1500000 },
      ],
    },
    {
      category: "Các món rau",
      items: [
        { name: "RAU MUỐNG XÀO TỎI", price: 250000 },
        { name: "CẢI THÌA XÀO NẤM ĐÔNG CÔ", price: 300000 },
        { name: "RAU MỒNG TƠI XÀO TỎI", price: 240000 },
        { name: "BẮP CẢI LUỘC", price: 200000 },
        { name: "CANH CẢI XANH", price: 260000 },
      ],
    },
    {
      category: "Các món tráng miệng",
      items: [
        { name: "CHÈ KHÚC BẠCH", price: 180000 },
        { name: "BÁNH FLAN", price: 150000 },
        { name: "CHÈ SẦU RIÊNG", price: 200000 },
        { name: "RAU CÂU DỪA", price: 160000 },
        { name: "TRÁI CÂY TƯƠI", price: 140000 },
      ],
    },
    {
      category: "Các món nước",
      items: [
        { name: "NƯỚC CAM TƯƠI", price: 120000 },
        { name: "TRÀ ĐÀO", price: 100000 },
        { name: "SINH TỐ BƠ", price: 140000 },
        { name: "CÀ PHÊ SỮA ĐÁ", price: 110000 },
        { name: "SỮA ĐẬU NÀNH", price: 90000 },
      ],
    },
  ];

  const [onClickMenuNavBar1, setOnClickMenuNavBar1] = useState(true);
  const [onClickMenuNavBar2, setOnClickMenuNavBar2] = useState(false);
  const [onClickMenuNavBar3, setOnClickMenuNavBar3] = useState(false);

  const handleOnClickImageMenu = () => {
    const location_id = localStorage.getItem("selectedPlaceId");
    navigate(`/DetailRestaurant/${location_id}/menuImages`);
  };

  const [newCombo, setNewCombo] = useState([]);
  const handleAddItem = (item, quantity) => {
    if (quantity > 0) {
      const existingItem = newCombo.find(
        (comboItem) => comboItem.item.name === item.name
      );

      if (existingItem) {
        setNewCombo((prev) =>
          prev.map((comboItem) =>
            comboItem.item.name === item.name
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

  const currentFoodItems = foodData.slice(indexOfFirstItem, indexOfLastItem);
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
              clicked={onClickMenuNavBar1}
              setOnClickMenuNavBar1={setOnClickMenuNavBar1}
              setOnClickMenuNavBar2={setOnClickMenuNavBar2}
              setOnClickMenuNavBar3={setOnClickMenuNavBar3}
            />
            <ButtonMenuNavBar
              text={"Tất cả món ăn"}
              clicked={onClickMenuNavBar2}
              setOnClickMenuNavBar1={setOnClickMenuNavBar1}
              setOnClickMenuNavBar2={setOnClickMenuNavBar2}
              setOnClickMenuNavBar3={setOnClickMenuNavBar3}
            />
            <ButtonMenuNavBar
              text={"Tạo combo mới"}
              clicked={onClickMenuNavBar3}
              setOnClickMenuNavBar1={setOnClickMenuNavBar1}
              setOnClickMenuNavBar2={setOnClickMenuNavBar2}
              setOnClickMenuNavBar3={setOnClickMenuNavBar3}
            />
          </div>
        </div>
      </div>

      {onClickMenuNavBar1 && (
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
            {menuAvailable.map((menu, index) => (
              <CardMenuAvailable key={index} menu={menu} />
            ))}
          </div>
        </div>
      )}

      {onClickMenuNavBar2 && (
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

      {onClickMenuNavBar3 && (
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
                    {category.category}
                  </h3>
                  <ul>
                    {category.items.map((item, idx) => (
                      <li
                        className="MenuNavBar_createMenu_div_index_H3_li"
                        key={idx}
                      >
                        <span>{item.name}</span>
                        <span className="MenuNavBar_createMenu_div_index_H3_span2">
                          {item.price} đ
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
                    count={Math.ceil(foodData.length / itemsPerPage)} // Calculate number of pages
                    page={currentPage} // Track current page
                    onChange={handlePageChange} // Handle page change
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                  />
                </ThemeProvider>
              </div>
              <BasicModal combo={newCombo}></BasicModal>
            </div>
          </div>
        </>
      )}

      {/* <BasicModal combo={newCombo}></BasicModal> */}
    </>
  );
};

export default Menu;
