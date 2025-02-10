import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenModalPayment } from "../../../redux/features/tableSlice";
import "./ModalPayment.css";

const ModalPayment = ({ open, selectedPlace }) => {
  const dispatch = useDispatch();
  const choosedTable = useSelector((state) => state.table.choosedTable);

  console.log("choosedTable in modalpayment:", choosedTable);
  console.log("Modal open:", open); // Debugging

  if (!open) return null; // Nếu `open` là false, không hiển thị modal

  return (
    <Modal open={open} onClose={() => dispatch(setOpenModalPayment(false))}>
      <section className="ModalPayment-section">
        <div className="ModalPayment-div1">
          <Button
            className="ModalPayment-button-close"
            onClick={() => dispatch(setOpenModalPayment(false))}
          >
            <CloseIcon className="ModalPayment-button-close-icon" />
          </Button>
        </div>
        <div className="ModalPayment-div2">
          <div className="ModalPayment-div2-header">
            <h2 className="logo__name">TheMeal</h2>
            <img
              src={require("../../../assets/images/logo.png")}
              alt="Logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
              }}
            />
          </div>
          <div className="ModalPayment-div2-title">
            <span>Xác thực đặt bàn</span>
          </div>
        </div>
        <div className="ModalPayment-div2-address">
          {selectedPlace?.address || "No address available"}
        </div>
        <div className="ModalPayment-div2-bookdetail">
          <h3>
            <span>Booking details</span>
          </h3>

          <Box sx={{ maxWidth: 400, fontFamily: "Arial" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1f3c88", mb: 1 }}
            >
              Booking Details
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Ngày đặt</Typography>
              <Typography>{choosedTable?.ngay || "N/A"}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Giờ đặt</Typography>
              <Typography>{choosedTable?.gio || "N/A"}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Số khách</Typography>
              <Typography>{choosedTable?.soNguoi || "N/A"}</Typography>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "bold" }}>Mã số</Typography>
              <Typography>{choosedTable?.maSo.maSoNhaHang || "N/A"}</Typography>
            </Box> */}
          </Box>
          <div>
            <Button className="ModalPayment-div2-button">
              <span>Thanh toán</span>
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ModalPayment;
