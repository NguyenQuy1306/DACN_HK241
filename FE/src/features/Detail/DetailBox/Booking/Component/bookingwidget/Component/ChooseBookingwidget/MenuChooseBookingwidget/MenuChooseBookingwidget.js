import React, { useState, useEffect, createRef, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../../../../../../../../../redux/features/navigationSlice";
import {
  getComboAvailable,
  setComboType,
} from "../../../../../../../../../redux/features/comboSlice";
import { setActiveTabMenu } from "../../../../../../../../../redux/features/navigationSlice";
import { setShouldScroll } from "../../../../../../../../../redux/features/navigationSlice";
import {
  openModalPayment,
  setOpenModalPayment,
} from "../../../../../../../../../redux/features/tableSlice";
import { setPaymentStatus } from "../../../../../../../../../redux/features/paymentSlice";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [choosedOptionByWithMenu, setChoosedOptionByWithMenu] = useState(true);
  const [choosedOptionByWithoutMenu, setChoosedOptionByWithoutMenu] =
    useState(false);
  const user = useSelector(selectUser);
  const choosedTable = useSelector((state) => state.table.choosedTable);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);

  const openModalPayment = useSelector((state) => state.table.openModalPayment);
  const handleBooking = async () => {
    if (choosedOptionByWithMenu && menuChoosed.length <= 0) {
      await Promise.all([
        dispatch(
          getComboAvailable({ restaurantId: selectedPlace.maSoNhaHang })
        ),
        dispatch(setActiveTab("Menu")),
        dispatch(setActiveTabMenu("Các combo có sẵn")),
        dispatch(setShouldScroll(true)),
      ]);
      toast.success("Hãy chọn combo!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }

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
      dispatch(setOpenModalPayment(true));
    }
  };
  useEffect(() => {
    if (!openModalPayment && paymentStatus === "success") {
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
      dispatch(setComboType(""));

      setDate(null);
      setcloseDateDiv(false);
      setTime(null);
      setcloseTimeDiv(true);
      setPerson(null);
      setClosePersonDiv(true);
      setOption(null);
      setCloseOptionDiv(true);

      dispatch(setPaymentStatus(""));
    }
  }, [openModalPayment, paymentStatus]);
  return (
    <div className="MenuChooseBookingwidgetDiv">
      <div className="MenuChooseBookingwidgetDiv_H1">
        <div className="MenuChooseBookingwidgetDiv_H1_option">
          <h3 className="MenuChooseBookingwidgetDiv_H1_option_h3">
            <span>Tuỳ chọn</span>
          </h3>
          <div className="MenuChooseBookingwidgetDiv_H1_option_choosen">
            <OptionMenuChooseBookingwidget
              text={"Đặt bàn với menu có sẵn"}
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
              text={"Đặt bàn không kèm theo menu"}
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
            <span>Tiếp tục</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MenuChooseBookingwidget;
