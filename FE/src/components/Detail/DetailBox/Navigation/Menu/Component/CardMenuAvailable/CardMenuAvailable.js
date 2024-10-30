import React from "react";
import "./CardMenuAvailable.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CardMenuAvailable = ({ selectedPlace, menu }) => {
  return (
    <div className="CardMenuAvailableDiv">
      <div className="CardMenuAvailableDiv_H1">
        <div>
          <h3 className="CardMenuAvailableDiv_H1_h3">
            {/* {combo.namSasASasAAe} */}
            {menu.name}
          </h3>
          <span className="CardMenuAvailableDiv_H1_span">
            <span>
              <span>€{menu.price} </span>
              per guest
            </span>
          </span>
        </div>
        <Button className="CardMenuAvailableDiv_H1_button">
          <ArrowForwardIosIcon className="CardMenuAvailableDiv_H1_button_icon"></ArrowForwardIosIcon>
        </Button>
      </div>
      <div className="CardMenuAvailableDiv_H2">
        <div className="CardMenuAvailableDiv_H2_div">
          <div className="CardMenuAvailableDiv_H2_div_div2">
            {" "}
            Có sẵn từ ngày 30/9 đến 1/10
          </div>
        </div>
      </div>
      <Button className="CardMenuAvailableDiv_button">
        {" "}
        <span className="CardMenuAvailableDiv_button_span">Đặt combo</span>
      </Button>
    </div>
  );
};

export default CardMenuAvailable;
