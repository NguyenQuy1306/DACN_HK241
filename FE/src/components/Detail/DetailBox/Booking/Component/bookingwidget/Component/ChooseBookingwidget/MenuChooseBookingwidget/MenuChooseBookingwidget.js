import React, { useState, useEffect, createRef } from "react";
import "./MenuChooseBookingwidget.css";
import OptionMenuChooseBookingwidget from "./Component/OptionMenuChooseBookingwidget";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import {
  selectUser,
  setStatusModalAuthentication,
} from "../../../../../../../../../redux/features/authenticationSlice";
import { createOrder } from "../../../../../../../../../redux/features/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setOpenBookingWithMenu } from "../../../../../../../../../redux/features/restaurantSlice";
const MenuChooseBookingwidget = ({
  selectedPlace,
  openBookingWithMenu,
  setDate = { setDate },
  setcloseDateDiv,
  setTime,
  setcloseTimeDiv,
  setPerson,
  setClosePersonDiv,
  setOption,
  setCloseOptionDiv,
}) => {
  const dispatch = useDispatch();
  const [choosedOptionByWithMenu, setChoosedOptionByWithMenu] = useState(true);
  const [choosedOptionByWithoutMenu, setChoosedOptionByWithoutMenu] =
    useState(false);
  const user = useSelector(selectUser);
  const choosedTable = useSelector((state) => state.table.choosedTable);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
  console.log("menuchoosed", menuChoosed);
  const bookingWithNewCombo = useSelector(
    (state) => state.restaurant.bookingWithNewCombo
  );
  const handleBooking = () => {
    // console.log("selectedPlace", selectedPlace);
    // console.log("choosedTable.maSo.thutuBan", choosedTable.maSo);
    if (choosedTable == null) {
      toast.error("Vui lòng chọn bàn trước khi đặt!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }
    if (!user) {
      dispatch(setStatusModalAuthentication({ openModal: true }));
    } else {
      console.log(
        "bookingWithNewCombobookingWithNewCombo",
        bookingWithNewCombo
      );

      dispatch(
        createOrder({
          customerID: user.maSoNguoiDung,
          tableId: choosedTable.maSo.thuTuBan,
          comboId: menuChoosed[0] ? menuChoosed[0].comboId : null,
          restaurantId: selectedPlace.maSoNhaHang,
          foodOrderRequests: bookingWithNewCombo
            ? menuChoosed[0].map(({ maSoMonAn, soLuong }) => ({
                maSoMonAn,
                soLuong,
              }))
            : [],
        })
      );

      toast.success("Bạn đã đặt bàn thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });

      dispatch(
        setOpenBookingWithMenu({
          openBookingWithMenu: false,
          menuChoosed: [],
          bookingWithNewCombo: false,
        })
      );

      setDate(null);
      setcloseDateDiv(false);
      setTime(null);
      setcloseTimeDiv(true);
      setPerson(null);
      setClosePersonDiv(true);
      setOption(null);
      setCloseOptionDiv(true);
    }
  };

  return (
    <div className="MenuChooseBookingwidgetDiv">
      <div className="MenuChooseBookingwidgetDiv_H1">
        <div className="MenuChooseBookingwidgetDiv_H1_option">
          <h3 className="MenuChooseBookingwidgetDiv_H1_option_h3">
            <span>Select an option</span>
          </h3>
          <div className="MenuChooseBookingwidgetDiv_H1_option_choosen">
            <OptionMenuChooseBookingwidget
              text={"Reservation with menu"}
              onClick={setChoosedOptionByWithMenu}
              onClick2={setChoosedOptionByWithoutMenu}
              choosedOptionByWithMenu={choosedOptionByWithMenu}
              openBookingWithMenu={openBookingWithMenu}
              icon={
                !choosedOptionByWithMenu ? (
                  <CheckCircleOutlineRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon"></CheckCircleOutlineRoundedIcon>
                ) : (
                  <CheckCircleRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon2"></CheckCircleRoundedIcon>
                )
              }
            ></OptionMenuChooseBookingwidget>
            <OptionMenuChooseBookingwidget
              text={"Reservation without menu"}
              onClick={setChoosedOptionByWithMenu}
              onClick2={setChoosedOptionByWithoutMenu}
              choosedOptionByWithMenu={choosedOptionByWithoutMenu}
              openBookingWithMenu={openBookingWithMenu}
              icon={
                !choosedOptionByWithoutMenu ? (
                  <CheckCircleOutlineRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon"></CheckCircleOutlineRoundedIcon>
                ) : (
                  <CheckCircleRoundedIcon className="MenuChooseBookingwidgetDiv_H1_option_choosen_icon2"></CheckCircleRoundedIcon>
                )
              }
            ></OptionMenuChooseBookingwidget>
          </div>
        </div>
        <div className="MenuChooseBookingwidgetDiv_H1_divButton">
          <Button
            className="MenuChooseBookingwidgetDiv_H1_divButton_Button"
            onClick={handleBooking}
          >
            <span>CONTINUE</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MenuChooseBookingwidget;
