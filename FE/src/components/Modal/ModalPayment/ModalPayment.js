import React from "react";
import { usePayOS } from "@payos/payos-checkout";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenModalPayment } from "../../../redux/features/tableSlice";
import { setPaymentStatus } from "../../../redux/features/paymentSlice";
import "./ModalPayment.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomizedTables from "../../../features/Detail/DetailBox/Navigation/Menu/Component/TableInModalMenu/TableInModalMenu";
import axios from "axios";

const ModalPayment = ({ open, selectedPlace }) => {
  const navigate = useNavigate();
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

  const dispatch = useDispatch();
  const choosedTable = useSelector((state) => state.table.choosedTable);
  const user = useSelector((state) => state.authentication.user);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);

  if (!open) return null;

  const handleOnClickPayment = async () => {
    setIsCreatingLink(true);
    // exit();
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

    console.log(result);

    setPayOSConfig((oldConfig) => ({
      ...oldConfig,
      CHECKOUT_URL: result.checkoutUrl,
      RETURN_URL: result.returnUrl,
    }));

    window.location.href = result;

    setIsOpen(true);
    setIsCreatingLink(false);
    // dispatch(setPaymentStatus("success"));
    dispatch(setOpenModalPayment(false));
  };

  const getCurrentDate = () => new Date().toLocaleDateString("vi-VN");

  return (
    <Modal
      open={open}
      onClose={() => dispatch(setOpenModalPayment(false))}
      className="ModalPayement"
    >
      <section className="ModalPayment-section">
        {/* Nút đóng modal */}
        <Button
          className="ModalPayment-button-close"
          onClick={() => dispatch(setOpenModalPayment(false))}
        >
          <CloseIcon className="ModalPayment-button-close-icon" />
        </Button>

        {/* Header Modal */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold" color="primary">
            Xác nhận đặt bàn
          </Typography>
          <img
            src={require("../../../assets/images/logo.png")}
            alt="Logo"
            style={{ width: "50px", borderRadius: "8px" }}
          />
        </Box>

        {/* Địa chỉ nhà hàng */}
        <Typography variant="subtitle1" fontWeight="bold">
          Nhà hàng: {selectedPlace?.address || "Không có thông tin"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Thông tin đặt bàn */}
        <Box className="ModalPayment-div2-bookdetail">
          <Typography variant="h6" fontWeight="bold" color="primary">
            Chi tiết đặt bàn
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography>Ngày đến:</Typography>
            <Typography fontWeight="bold">
              {choosedTable?.ngay || "N/A"}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography>Giờ ăn:</Typography>
            <Typography fontWeight="bold">
              {choosedTable?.gio || "N/A"}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography>Số khách:</Typography>
            <Typography fontWeight="bold">
              {choosedTable?.soNguoi || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Thông tin khách hàng */}
        <Typography variant="h6" fontWeight="bold" color="primary">
          Thông tin khách hàng
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography>Họ tên:</Typography>
          <Typography fontWeight="bold">{user?.hoTen || "N/A"}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography>Email:</Typography>
          <Typography fontWeight="bold">{user?.email || "N/A"}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Thông tin Menu đã chọn */}
        {menuChoosed.length > 0 && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Món đã chọn
            </Typography>
            <CustomizedTables combo={menuChoosed} />
          </Box>
        )}

        <p>
          Tiền đặt cọc: <span style={{ color: "red" }}>100.000 VND</span>
        </p>

        {/* Nút Thanh toán */}
        <Button
          className="ModalPayment-div2-button"
          onClick={handleOnClickPayment}
        >
          Thanh toán ngay
        </Button>
      </section>
    </Modal>
  );
};

export default ModalPayment;
