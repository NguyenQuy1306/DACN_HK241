import React, { useState, useEffect, createRef } from "react";
import "./Bookingwidget.css";
import HeaderBookingwidget from "./Component/HeaderBookingwidget/HeaderBookingwidget";
import StepBookingwidget from "./Component/StepBookingwidget/StepBookingwidget";
import { DateChooseBookingwidget } from "./Component/ChooseBookingwidget/DateChooseBookingwidget/DateChooseBookingwidget";
import TimeChooseBookingwidget from "./Component/ChooseBookingwidget/TimeChooseBookingwidget/TimeChooseBookingwidget";
import MenuChooseBookingwidget from "./Component/ChooseBookingwidget/MenuChooseBookingwidget/MenuChooseBookingwidget";
import { Button, Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpenBookingWithMenu } from "../../../../../../redux/features/restaurantSlice";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";

const { formatCurrency } = require("../../../../../../helper/helper");

const Bookingwidget = ({ selectedPlace }) => {
  const [date, setDate] = useState(null);
  const [closeDateDiv, setcloseDateDiv] = useState(false);
  const [time, setTime] = useState(null);
  const [closeTimeDiv, setcloseTimeDiv] = useState(true);
  const [person, setPerson] = useState(null);
  const [closePersonDiv, setClosePersonDiv] = useState(true);
  const [option, setOption] = useState(null);
  const [closeOptionDiv, setCloseOptionDiv] = useState(true);

  const dispatch = useDispatch();
  const openBookingWithMenu = useSelector(
    (state) => state.restaurant.openBookingWithMenu
  );

  const handleResetFindTable = () => {
    dispatch(
      setOpenBookingWithMenu({ openBookingWithMenu: false, menuChoosed: [] })
    );

    setDate(null);
    setcloseDateDiv(false);
    setTime(null);
    setcloseTimeDiv(true);
    setPerson(null);
    setClosePersonDiv(true);
    setOption(null);
    setCloseOptionDiv(true);
  };
  useEffect(() => {
    if (openBookingWithMenu) {
      setDate(null);
      setcloseDateDiv(false);
      setTime(null);
      setcloseTimeDiv(true);
      setPerson(null);
      setClosePersonDiv(true);
      setOption(null);
      setCloseOptionDiv(true);
    }
  }, [openBookingWithMenu]);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
  let totalCost = 0;
  if (
    Array.isArray(menuChoosed) &&
    menuChoosed.length > 0 &&
    !menuChoosed[0].comboName
  ) {
    totalCost = menuChoosed[0].reduce((sum, item) => {
      return sum + item.gia * item.soLuong;
    }, 0);
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleViewDetailMenuBooking = () => {
    setOpen(true);
  };
  const newMenu = useSelector((state) => state.restaurant.newMenu);
  console.log("newCombonewCombo:; ", newMenu);

  // Grouping function to handle both cases
  const groupFoodsByCategory = (foods) => {
    return foods.reduce((acc, food) => {
      const categoryId =
        food.item?.danhMuc?.maSoDanhMuc || food.danhMuc?.maSoDanhMuc;
      const categoryName = food.item?.danhMuc?.ten || food.danhMuc?.ten;

      if (!acc[categoryId]) {
        acc[categoryId] = { categoryName, items: [] };
      }
      acc[categoryId].items.push(food);
      return acc;
    }, {});
  };

  // Determine which data to use for grouping
  let groupedFoods = {};

  if (
    Array.isArray(menuChoosed) &&
    menuChoosed.length > 0 &&
    Array.isArray(menuChoosed[0]) &&
    !menuChoosed[0].comboName
  ) {
    // Use newMenu data if comboName is not selected
    groupedFoods = groupFoodsByCategory(newMenu[0]);
  } else if (menuChoosed[0]) {
    // Use selected combo data
    groupedFoods = groupFoodsByCategory(menuChoosed[0].foods);
  }

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="BookingwidgetDiv">
        <HeaderBookingwidget></HeaderBookingwidget>
        {!openBookingWithMenu && (
          <div className="BookingwidgetDiv_h1">
            <span>
              {" "}
              🔥 Sẵn sàng <b> đặt bàn </b> hôm nay
            </span>
          </div>
        )}
        {openBookingWithMenu && (
          <div class="BookingwidgetDiv_H1_new">
            <div data-testid="offer-tooltip" class="BookingwidgetDiv_H1_new_h1">
              <div class="BookingwidgetDiv_H1_new_h1_div1">
                <div
                  font-size="0"
                  class="BookingwidgetDiv_H1_new_h1_div1_classimage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    class="BookingwidgetDiv_H1_new_h1_div1_classimage_image"
                  >
                    <g fill-rule="evenodd">
                      <path d="M22.195 1.647a.751.751 0 0 1 .305.604v16.5c0 .329-.215.62-.529.717l-8.574 2.637a.5.5 0 0 1-.647-.478V4.787c0-.328.215-.62.53-.716l8.249-2.537a.748.748 0 0 1 .666.113Zm-3.103 9.49a.752.752 0 0 0-.938-.496l-3 .923a.75.75 0 0 0 .442 1.434l3-.923a.75.75 0 0 0 .496-.938Zm0-3.29a.752.752 0 0 0-.938-.496l-3 .923a.75.75 0 0 0 .442 1.434l3-.923a.75.75 0 0 0 .496-.938Z"></path>
                      <path d="m2.471 1.534 8.25 2.538a.75.75 0 0 1 .529.717v16.838a.5.5 0 0 1-.647.478l-8.574-2.637a.751.751 0 0 1-.529-.717V2.25a.75.75 0 0 1 .971-.717Zm2.437 9.603a.75.75 0 0 0 .4.901l.096.037 3 .923a.751.751 0 0 0 .537-1.397l-.095-.037-3-.923a.752.752 0 0 0-.938.496Zm0-3.29a.75.75 0 0 0 .4.901l.096.037 3 .923a.751.751 0 0 0 .537-1.397l-.095-.037-3-.923a.752.752 0 0 0-.938.496Z"></path>
                    </g>
                  </svg>
                </div>
                <div class="BookingwidgetDiv_H1_new_h1_div_detail">
                  <p class="BookingwidgetDiv_H1_new_h1_div_detail_p1">
                    {menuChoosed[0].comboName
                      ? menuChoosed[0].comboName
                      : "Menu bạn đã tạo"}
                  </p>
                  <p
                    data-testid="offer-tooltip-price-per-guest"
                    class="BookingwidgetDiv_H1_new_h1_div_detail_p2"
                  >
                    <span>
                      <span>
                        {" "}
                        {menuChoosed[0].comboPrice
                          ? formatCurrency(menuChoosed[0].comboPrice)
                          : formatCurrency(totalCost)}
                      </span>{" "}
                      đ
                    </span>
                    <div className="BookingwidgetDiv_H1_new_h1_div_detail_p2_div">
                      <Button
                        className="BookingwidgetDiv_H1_new_h1_div_detail_p2_div_button"
                        onClick={handleViewDetailMenuBooking}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </p>
                  <p
                    data-testid="offer-tooltip-availability"
                    class="BookingwidgetDiv_H1_new_h1_div_detail_p3"
                  >
                    Chú ý: Bạn hãy tiến hành chọn các tiêu chí phía dưới để hoàn
                    tất đặt combo này!
                  </p>
                </div>
                <div
                  data-testid="close-offer-tooltip"
                  class="css-jmrgk ega2idl0"
                  onClick={handleResetFindTable}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    class="BookingwidgetDiv_H1_new_h1_div_delete"
                  >
                    <g fill-rule="evenodd">
                      <path d="M17.625 7.5a.75.75 0 0 1 .75.75v12c0 1.24-1.01 2.25-2.25 2.25h-8.25c-1.24 0-2.25-1.01-2.25-2.25v-12a.75.75 0 0 1 1.5 0v12c0 .413.337.75.75.75h8.25c.413 0 .75-.337.75-.75v-12a.75.75 0 0 1 .75-.75Zm-7.5 0a.75.75 0 0 1 .75.75V18a.75.75 0 0 1-1.5 0V8.25a.75.75 0 0 1 .75-.75Zm3.75-.03a.75.75 0 0 1 .75.75v9.75a.75.75 0 0 1-1.5 0V8.22a.75.75 0 0 1 .75-.75Z"></path>
                      <path d="M5.25 6a.75.75 0 0 1-.135-1.488L5.25 4.5H9a3 3 0 0 1 6 0h3.75a.75.75 0 0 1 .135 1.488L18.75 6H5.25Zm8.25-1.5a1.5 1.5 0 0 0-3 0h3Z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="BookingwidgetDiv_H1_new_h1_div2">
                <div class="BookingwidgetDiv_H1_new_h1_div2_div"></div>
              </div>
            </div>
          </div>
        )}
        <StepBookingwidget
          datePicked={date}
          timePicked={time}
          personPicked={person}
          optionPicked={option}
          setDate={setDate}
          setTime={setTime}
          setPerson={setPerson}
          setOption={setOption}
          setcloseDateDiv={setcloseDateDiv}
          setcloseTimeDiv={setcloseTimeDiv}
          setclosePersonDiv={setClosePersonDiv}
          setcloseOptionDiv={setCloseOptionDiv}
        ></StepBookingwidget>
        {closeDateDiv === false && (
          <DateChooseBookingwidget setDate={setDate}></DateChooseBookingwidget>
        )}
        {closeTimeDiv === false && (
          <TimeChooseBookingwidget
            setTime={setTime}
            type={"Time"}
          ></TimeChooseBookingwidget>
        )}
        {closePersonDiv === false && (
          <TimeChooseBookingwidget
            setTime={setPerson}
            type={"Person"}
          ></TimeChooseBookingwidget>
        )}
        {closeOptionDiv === false && (
          <MenuChooseBookingwidget
            openBookingWithMenu={openBookingWithMenu}
          ></MenuChooseBookingwidget>
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="CardMenuAvailableDiv_Modal_css">
          <div className="CardMenuAvailableDiv_Modal">
            <div className="CardMenuAvailableDiv_Modal_div">
              <div className="CardMenuAvailableDiv_Modal_div_div">
                <p className="CardMenuAvailableDiv_Modal_div_div_p">
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_nameMenu">
                    {menuChoosed[0].comboName
                      ? menuChoosed[0].comboName
                      : "Menu bạn đã tạo"}
                  </div>
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_priceMenu">
                    <span>
                      {menuChoosed[0].comboName
                        ? formatCurrency(menuChoosed[0].comboPrice)
                        : formatCurrency(totalCost)}
                      đ
                    </span>
                  </div>

                  <p className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu"></p>

                  {!menuChoosed[0].comboName
                    ? Object.values(groupedFoods).map((category, index) => (
                        <div key={index}>
                          <h3>{category.categoryName}</h3>
                          <ul>
                            {category.items.map((item, itemIndex) => (
                              <p
                                key={itemIndex}
                                className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu_p"
                              >
                                {item.item.ten} - {item.item.gia} VND{" "}
                                {item.quantity
                                  ? `- Số lượng ${item.quantity}`
                                  : ""}
                              </p>
                            ))}
                          </ul>
                        </div>
                      ))
                    : Object.values(groupedFoods).map((category, index) => (
                        <div key={index}>
                          <h3>{category.categoryName}</h3>
                          <ul>
                            {category.items.map((item, itemIndex) => (
                              <p
                                key={itemIndex}
                                className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu_p"
                              >
                                {item.ten} - {item.gia} VND -{" "}
                                {item.quantity
                                  ? `Số lượng ${item.quantity}`
                                  : ""}
                              </p>
                            ))}
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
                        onClick={handleCloseModal}
                      >
                        <span>Quay lại</span>
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
    </>
  );
};
export default Bookingwidget;
