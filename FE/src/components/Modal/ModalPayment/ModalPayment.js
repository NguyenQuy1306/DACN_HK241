import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenModalPayment } from "../../../redux/features/tableSlice";
import { setPaymentStatus } from "../../../redux/features/paymentSlice";
import "./ModalPayment.css";
import { selectUser } from "../../../redux/features/authenticationSlice";
import CustomizedTables from "../../Detail/DetailBox/Navigation/Menu/Component/TableInModalMenu/TableInModalMenu";
const ModalPayment = ({ open, selectedPlace }) => {
  const dispatch = useDispatch();
  const choosedTable = useSelector((state) => state.table.choosedTable);
  console.log("choosedTable in modalpayment:", choosedTable);
  console.log("Modal open:", open); // Debugging
  const user = useSelector(selectUser);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
  if (menuChoosed.length > 0) {
    console.log("menuchoosed", menuChoosed);
  }
  console.log("user", user);
  if (!open) return null; // Nếu `open` là false, không hiển thị modal
  const handleOnClickPayment = () => {
    //call api payOS
    // after success payOS
    dispatch(setPaymentStatus("success"));
    dispatch(setOpenModalPayment(false));
  };
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const currentTime = new Date().toLocaleTimeString("en-GB").replace(/:/g, ":");
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
  const today = getCurrentDate();
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
          <Box sx={{ maxWidth: 500, fontFamily: "Arial" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1f3c88", mb: 1 }}
            >
              Chi tiết đặt bàn
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Ngày đến</Typography>
              <Typography>{choosedTable?.ngay || "N/A"}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Giờ ăn</Typography>
              <Typography>{choosedTable?.gio || "N/A"}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Số khách</Typography>
              <Typography>{choosedTable?.soNguoi || "N/A"}</Typography>
            </Box>
          </Box>
          <Box sx={{ maxWidth: 500, fontFamily: "Arial", display: "flex" }}>
            <Box sx={{ width: 200 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1f3c88", mb: 1 }}
              >
                Khách đặt
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                {/* <Typography sx={{ fontWeight: "bold" }}>Ngày đặt</Typography> */}
                <Typography>{user?.hoTen || "N/A"}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                {/* <Typography sx={{ fontWeight: "bold" }}>Giờ đặt</Typography> */}
                <Typography>{user?.email || "N/A"}</Typography>
              </Box>
            </Box>
            <Box sx={{ width: 300 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  sx={{ fontWeight: "bold", color: "#1f3c88", mb: 1 }}
                >
                  Đơn hàng#
                </Typography>
                <Typography>{user?.email || "N/A"}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  sx={{ fontWeight: "bold", color: "#1f3c88", mb: 1 }}
                >
                  Ngày đặt
                </Typography>
                <Typography>{today || "N/A"}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  sx={{ fontWeight: "bold", color: "#1f3c88", mb: 1 }}
                >
                  Giờ đặt
                </Typography>
                <Typography>{currentTime || "N/A"}</Typography>
              </Box>
            </Box>
          </Box>

          {menuChoosed.length > 0 && (
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Menu của bạn
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* <CustomizedTables
                  combo={menuChoosed[0].foods}
                ></CustomizedTables> */}
              </Typography>
            </Box>
          )}
          <div>
            <Button
              className="ModalPayment-div2-button"
              onClick={handleOnClickPayment}
            >
              <span>Thanh toán</span>
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ModalPayment;
