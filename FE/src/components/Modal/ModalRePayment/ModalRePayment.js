import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalRePayment = ({
  open,
  handleClose,
  pendingPayment,
  handleContinuePayment,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bạn có một đơn hàng chưa thanh toán
        </Typography>
        <Typography variant="body1" gutterBottom>
          Mã đơn hàng:{" "}
          <strong>{pendingPayment ? pendingPayment.orderCodePayOs : ""}</strong>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tại nhà hàng:{" "}
          <strong>{pendingPayment ? pendingPayment.restaurantName : ""}</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Bạn có thể tiếp tục thanh toán ngay bây giờ.
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ mr: 2 }} color="secondary">
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinuePayment}
          >
            Tiếp tục thanh toán
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalRePayment;
