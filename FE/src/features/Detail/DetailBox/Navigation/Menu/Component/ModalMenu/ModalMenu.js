import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomizedTables from "../TableInModalMenu/TableInModalMenu";
import AddIcon from "@mui/icons-material/Add";
import { setOpenBookingWithMenu } from "../../../../../../../redux/features/restaurantSlice";
import { useSelector, useDispatch } from "react-redux";
import "./ModalMenu.css";
import axios from "axios";
import { useState } from "react";
import { usePayOS } from "@payos/payos-checkout";
import {
  createComboByUser,
  setComboType,
} from "../../../../../../../redux/features/comboSlice";
import {
  selectUser,
  setStatusModalAuthentication,
} from "../../../../../../../redux/features/authenticationSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ combo, selectedPlace }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const combo_convert = combo.map(({ item, quantity }) => ({
    maSoMonAn: item.maSoMonAn,
    ten: item.ten,
    gia: item.gia,
    soLuong: quantity,
  }));
  const handleOpen = () => {
    dispatch(setComboType(""));
    setOpen(true);
  };

  const handleOnclose = () => {
    setOpen(false);
    // dispatch(setComboType(""));
  };
  const user = useSelector(selectUser);
  const handleCancelCreateMenu = () => {
    setOpen(false);
    dispatch(setComboType(""));
  };
  const handleBookingWithNewMenu = async () => {
    if (!user) {
      dispatch(setStatusModalAuthentication({ openModal: true }));
      setOpen(false);
      return;
    }
    dispatch(setComboType("newCombo"));

    // const combo_convert = combo.map(({ item, quantity }) => ({
    //   maSoMonAn: item.maSoMonAn,
    //   ten: item.ten,
    //   gia: item.gia,
    //   soLuong: quantity,
    // }));
    setOpen(false);
    dispatch(
      setOpenBookingWithMenu({
        openBookingWithMenu: true,
        menuChoosed: [combo_convert],
        newMenu: [combo],
        bookingWithNewCombo: true,
      })
    );
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        onClose={handleOnclose}
        className="modal-modal-description_button"
      >
        <AddIcon className="modal-modal-description_button_icon"></AddIcon>
        <span className="odal-modal-description_button_span"> Tạo menu </span>
      </Button>
      <Modal
        open={open}
        onClose={handleOnclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Menu của bạn
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <CustomizedTables combo={combo_convert}></CustomizedTables>
          </Typography>
          <div className="modal-modal-description_button_div">
            <Button
              className="modal-modal-description_button"
              onClick={handleBookingWithNewMenu}
            >
              Đặt bàn với menu được tạo
            </Button>
            <Button
              className="modal-modal-description_button_cancel"
              onClick={handleCancelCreateMenu}
            >
              Huỷ bỏ
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
