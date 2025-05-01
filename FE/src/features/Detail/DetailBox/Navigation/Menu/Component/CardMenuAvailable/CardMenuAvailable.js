import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComboType } from "../../../../../../../redux/features/comboSlice";

import { usePayOS } from "@payos/payos-checkout";

import "./CardMenuAvailable.css";
import { setOpenBookingWithMenu } from "../../../../../../../redux/features/restaurantSlice";
import { FRONTEND_URL } from "../../../../../../../utils/util";

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
      window.location.href = `${FRONTEND_URL}/home`;
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
    dispatch(
      setOpenBookingWithMenu({
        openBookingWithMenu: true,
        menuChoosed: [menu],
        bookingWithNewCombo: false,
      })
    );
    dispatch(setComboType("availableCombo"));
    setOpen(false);
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
          <span className="CardMenuAvailableDiv_button_span">Đặt menu</span>
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
                            {item.ten} - {formatCurrency(item.gia)} VND
                          </p>
                        ))}
                        {/* {detail.ten} */}
                      </ul>
                    </div>
                  ))}
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu">
                    <p className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu_p">
                      {" "}
                      Các món được liệt kê ở trên được tạo theo nhu cầu có sẵn
                      tại nhà hàng.
                    </p>
                    {/* <p className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu_p">
                      {" "}
                      This preset menu is available from 2024-12-31 to
                      2024-12-31 for dinner on Tuesday, Wednesday and Thursday.{" "}
                    </p> */}
                    {/* <p className="CardMenuAvailableDiv_Modal_div_div_p_noteMenu_p">
                      {" "}
                      Please note, it will not be possible to choose from the "à
                      la carte" menu once at the restaurant.
                    </p> */}
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
