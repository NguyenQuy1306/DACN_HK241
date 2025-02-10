import React from "react";
import "./DetailBox.css";
import TitleDetail from "./Title/TitleDetail";
import Booking from "./Booking/Booking";
import Navigation from "./Navigation/Navigation";
import ModalPayment from "../../Modal/ModalPayment/ModalPayment";
import { useSelector } from "react-redux";

const DetailBox = ({ selectedPlace }) => {
  const openModalPayment = useSelector((state) => state.table.openModalPayment);
  console.log("openModalPaymentâsa ", openModalPayment);
  return (
    <div className="DetailBoxDiv">
      <TitleDetail selectedPlace={selectedPlace} />
      <Booking selectedPlace={selectedPlace} />
      <Navigation selectedPlace={selectedPlace} />

      {/* Đảm bảo openModalPayment là boolean */}
      <ModalPayment open={!!openModalPayment} selectedPlace={selectedPlace} />
    </div>
  );
};

export default DetailBox;
