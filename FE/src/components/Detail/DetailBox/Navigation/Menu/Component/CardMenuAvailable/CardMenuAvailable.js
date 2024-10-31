import React, { useState, useEffect } from "react";
import "./CardMenuAvailable.css";
import { Button, Modal, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BasicModal from "../ModalMenu/ModalMenu";
import CloseIcon from "@mui/icons-material/Close";
import { setOpenBookingWithMenu } from "../../../../../../../redux/features/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

const CardMenuAvailable = ({ selectedPlace, menu }) => {
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

  const handleOnClickBookingRestaurantWithAvailableMenu = () => {
    setOpen(false);
    dispatch(setOpenBookingWithMenu(true));
  };

  return (
    <div>
      <div className="CardMenuAvailableDiv" onClick={handleOpen}>
        <div className="CardMenuAvailableDiv_H1">
          <div>
            <h3 className="CardMenuAvailableDiv_H1_h3">{menu.name}</h3>
            <span className="CardMenuAvailableDiv_H1_span">
              <span>€{menu.price} per guest</span>
            </span>
          </div>
          <Button className="CardMenuAvailableDiv_H1_button">
            <ArrowForwardIosIcon className="CardMenuAvailableDiv_H1_button_icon" />
          </Button>
        </div>
        <div className="CardMenuAvailableDiv_H2">
          <div className="CardMenuAvailableDiv_H2_div">
            <div className="CardMenuAvailableDiv_H2_div_div2">
              {menu.availability}
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
                    Menu de la St-Sylvestre
                  </div>
                  <div className="CardMenuAvailableDiv_Modal_div_div_p_priceMenu">
                    <span>120000đ</span>
                  </div>

                  <p className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu"></p>

                  {menu.details.map((detail, detailIndex) => (
                    <div key={detailIndex}>
                      <h3>{detail.category}</h3>
                      <ul>
                        {detail.items.map((item, itemIndex) => (
                          <p
                            key={itemIndex}
                            className="CardMenuAvailableDiv_Modal_div_div_p_motaMenu_p"
                          >
                            {item}
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
