import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenModalPayment } from "../../../redux/features/tableSlice";
import { setPaymentStatus } from "../../../redux/features/paymentSlice";
import "./ModalPayment.css";
import CustomizedTables from "../../Detail/DetailBox/Navigation/Menu/Component/TableInModalMenu/TableInModalMenu";

const ModalPayment = ({ open, selectedPlace }) => {
  const dispatch = useDispatch();
  const choosedTable = useSelector((state) => state.table.choosedTable);
  const user = useSelector((state) => state.authentication.user);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);

  if (!open) return null;

  const handleOnClickPayment = () => {
    dispatch(setPaymentStatus("success"));
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
