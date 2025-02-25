import React, { useState, useEffect } from "react";
import "./CardMenuAvailable.css";
import { Button, Modal, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BasicModal from "../ModalMenu/ModalMenu";
import CloseIcon from "@mui/icons-material/Close";
import { setOpenBookingWithMenu } from "../../../../../../../redux/features/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { setComboType } from "../../../../../../../redux/features/comboSlice";
import axios from "axios";
import { usePayOS } from "@payos/payos-checkout";
const { formatCurrency } = require("../../../../../../../helper/helper");

const CardMenuAvailable = ({ selectedPlace, menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);

  const [payOSConfig, setPayOSConfig] = useState({
    RETURN_URL: window.location.origin, // required
    ELEMENT_ID: "embedded-payment-container", // required
    CHECKOUT_URL: null, // required
    embedded: true, // Nếu dùng giao diện nhúng
    onSuccess: (event) => {
      //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
      setIsOpen(false);
      setMessage("Thanh toan thanh cong");
      window.location.href = "http://localhost:3000/home";
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const openBookingWithMenu = useSelector(
    (state) => state.restaurant.openBookingWithMenu
  );
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
  // const combo_convert = menu.map(({ item, quantity }) => ({
  //   maSoMonAn: item.maSoMonAn,
  //   gia: item.gia,
  //   soLuong: quantity,
  // }));
  const handleOnClickBookingRestaurantWithAvailableMenu = async () => {
    // dispatch();
    // setOpenBookingWithMenu({
    //   openBookingWithMenu: true,
    //   menuChoosed: [menu],
    //   bookingWithNewCombo: false,
    // })
    setIsCreatingLink(true);
    // exit();
    try {
      const response = await axios.get(
        "http://localhost:8080/api/payments/create-payment-link",
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        console.log("Server doesn't response");
      }

      const result = await response.data;

      setPayOSConfig((oldConfig) => ({
        ...oldConfig,
        CHECKOUT_URL: result.checkoutUrl,
        RETURN_URL: result.returnUrl,
      }));

      window.location.href = result;

      setIsOpen(true);
      setIsCreatingLink(false);
      setOpen(false);

      dispatch(setComboType("availableCombo"));
    } catch (e) {
      console.error(e);
    }
  };

  const { comboId, comboName, comboPrice, comboCreationTime, foods } = menu;

  // Group foods by category
  const groupedFoods = foods.reduce((acc, food) => {
    const categoryId = food.danhMuc.maSoDanhMuc;
    const categoryName = food.danhMuc.ten;
    //!acc[categoryId] nếu null thì trong acc chưa có category này.
    // dùng dictionary để lưu trữ
    if (!acc[categoryId]) {
      acc[categoryId] = { categoryName, items: [] };
    }
    acc[categoryId].items.push(food);

    return acc;
  }, {});
  return (
    <div>
      <div className="CardMenuAvailableDiv" onClick={handleOpen}>
        <div className="CardMenuAvailableDiv_H1">
          <div>
            <h3 className="CardMenuAvailableDiv_H1_h3">{comboName}</h3>
            <span className="CardMenuAvailableDiv_H1_span">
              <span>{formatCurrency(comboPrice)} đ/ người</span>
            </span>
          </div>
          <Button className="CardMenuAvailableDiv_H1_button">
            <ArrowForwardIosIcon className="CardMenuAvailableDiv_H1_button_icon" />
          </Button>
        </div>
        <div className="CardMenuAvailableDiv_H2">
          <div className="CardMenuAvailableDiv_H2_div">
            <div className="CardMenuAvailableDiv_H2_div_div2">
              {comboCreationTime}
            </div>
          </div>
        </div>
        <Button className="CardMenuAvailableDiv_button">
          <span className="CardMenuAvailableDiv_button_span">Đặt combo</span>
        </Button>
      </div>

      {/* Modal Component */}
      <Modal open={open} onClose={handleClose}>
        <div className="CardMenuAvailableDiv_Modal_css">
          <div className="CardMenuAvailableDiv_Modal">
            <div className="CardMenuAvailableDiv_Modal_div">
              <div className="CardMenuAvailableDiv_Modal_div_div">
                <p className="CardMenuAvailableDiv_Modal_div_div_p">
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_nameMenu">
                    {comboName}
                  </div>
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_priceMenu">
                    <span>{formatCurrency(comboPrice)}đ</span>
                  </div>

                  <p className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu"></p>

                  {Object.values(groupedFoods).map((category, index) => (
                    <div key={index}>
                      <h3>{category.categoryName}</h3>
                      <ul>
                        {category.items.map((item, itemIndex) => (
                          <p
                            key={itemIndex}
                            className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu_p"
                          >
                            {item.ten} - {item.gia} VND
                          </p>
                        ))}
                        {/* {detail.ten} */}
                      </ul>
                    </div>
                  ))}
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu">
                    <p className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu_p">
                      {" "}
                      The dishes listed above are subject to change depending on
                      availability.
                    </p>
                    <p className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu_p">
                      {" "}
                      This preset menu is available from 2024-12-31 to
                      2024-12-31 for dinner on Tuesday, Wednesday and Thursday.{" "}
                    </p>
                    <p className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu_p">
                      {" "}
                      Please note, it will not be possible to choose from the "à
                      la carte" menu once at the restaurant.
                    </p>
                  </div>
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_button">
                    <div className="CardMenuAvailableDiv_Modal_div_div_p_button_div">
                      <Button
                        className="CardMenuAvailableDiv_Modal_div_div_p_button_div_css"
                        onClick={
                          handleOnClickBookingRestaurantWithAvailableMenu
                        }
                      >
                        <span>Đặt menu này!</span>
                      </Button>
                    </div>
                  </div>
                </p>
                <CloseIcon
                  className="CardMenuAvailableDiv_Modal_div_div_icon"
                  onClick={handleCloseModal}
                ></CloseIcon>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardMenuAvailable;
