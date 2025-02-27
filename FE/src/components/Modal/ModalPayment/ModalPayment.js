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
import { createOrder } from "../../../redux/features/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import { createPaymentLink } from "../../../redux/features/paymentSlice";
import useScript from "react-script-hook";
import { useSearchParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
const ModalPayment = ({ open, selectedPlace }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // State hooks
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [openDialogLoading, setOpenDialogLoading] = useState(false);
  // Redux state
  const deposit = useSelector((state) => state.payment.deposit);
  const choosedTable = useSelector((state) => state.table.choosedTable);
  const user = useSelector((state) => state.authentication.user);
  const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
  const bookingWithNewCombo = useSelector(
    (state) => state.restaurant.bookingWithNewCombo
  );

  // Load script PayOS
  const [loading, error] = useScript({
    src: process.env.REACT_APP_PAYOS_SCRIPT,
    checkForExisting: true,
  });

  console.log("checkoutUrlcheckoutUrl", checkoutUrl);

  const RETURN_URL = `${window.location.href}/ResultPayment/`;
  const CANCEL_URL = `${window.location.href}/ResultPayment/`;

  const payOSConfig = {
    RETURN_URL: RETURN_URL,
    ELEMENT_ID: "config_root",
    CHECKOUT_URL: checkoutUrl,
    onExit: (eventData) => {
      console.log("Payment exit:", eventData);
    },
    onSuccess: (eventData) => {
      console.log("Payment success:", eventData);
      window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
      window.open("/DetailRestaura12121", "_blank");
    },
    onCancel: (eventData) => {
      console.log("Payment cancelled:", eventData);
      window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
    },
  };
  console.log("payOSConfig.CHECKOUT_URL", payOSConfig.CHECKOUT_URL);

  // usePayOS hook
  const { open: openPayOS } = usePayOS(payOSConfig);

  useEffect(() => {
    if (message) {
      console.log("Người dùng đã hoàn thành thanh toán!");
    }
  }, [message]);

  useEffect(() => {
    if (checkoutUrl) {
      console.log("useeffect", openPayOS());
      openPayOS();
    }
  }, [checkoutUrl]);
  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "PAID") {
      openPayOS();
    }
  }, [searchParams]);
  console.log("dêrerere", deposit);
  const createPaymentLinkHandle = async (callbackFunction) => {
    try {
      setOpenDialogLoading(true);
      setIsCreatingLink(true);
      console.log("menuChoosed in createpaymentlink", menuChoosed);
      //foodOrderRequests chỉ giành cho newCombo còn comboId giành cho availableCombo
      const orderPayload = {
        customerID: user?.maSoNguoiDung,
        tableId: choosedTable?.maSo?.thuTuBan,
        comboId: menuChoosed[0]?.comboId || null,
        restaurantId: selectedPlace?.maSoNhaHang,
        foodOrderRequests:
          menuChoosed[0] && !menuChoosed[0].foods
            ? menuChoosed[0].map((food) => ({
                maSoMonAn: food.maSoMonAn,
                soLuong: food.soLuong ?? 1,
                gia: food.gia,
                ten: food.ten,
              }))
            : [],
      };

      console.log("orderPayload", orderPayload);
      const orderResponse = await dispatch(createOrder(orderPayload)).unwrap();

      if (!orderResponse || orderResponse.error) {
        throw new Error("Tạo đơn hàng thất bại!");
      }
      console.log("menuChoosed", menuChoosed);
      console.log("depositdeposit", deposit);
      // const deposit = 10000;
      const response = await dispatch(
        createPaymentLink({ request: orderPayload, deposit, RETURN_URL })
      ).unwrap();
      console.log("responseresponse", response.data);
      if (!response || response.error) {
        throw new Error("Tạo link thanh toán thất bại!");
      }

      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          orderCode: orderResponse.maSoDatBan,
          orderCodePayOs: response.data.paymentLinkId,
          timeStamp: Date.now(),
          checkoutUrl: response.data.checkoutUrl,
          restaurantName: selectedPlace.ten,
        })
      );
      callbackFunction(response.data);
    } catch (error) {
      console.error("Lỗi khi tạo link thanh toán:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setOpenDialogLoading(false);
      setIsCreatingLink(false);
    }
  };

  const openPaymentDialog = async (checkoutResponse) => {
    if (checkoutResponse) {
      let url = checkoutResponse.checkoutUrl;
      // if (checkoutResponse.checkoutUrl.startsWith("https://dev.pay.payos.vn")) {
      //   url = checkoutResponse.checkoutUrl.replace(
      //     "https://dev.pay.payos.vn",
      //     "https://next.dev.pay.payos.vn"
      //   );
      // }
      // if (checkoutResponse.checkoutUrl.startsWith("https://pay.payos.vn")) {
      //   url = checkoutResponse.checkoutUrl.replace(
      //     "https://pay.payos.vn",
      //     "https://next.pay.payos.vn"
      //   );
      // }
      console.log("urlurl", url);
      dispatch(setPaymentStatus("success"));
      dispatch(setOpenModalPayment(false));
      setCheckoutUrl(url);
      window.location.href = url;
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => dispatch(setOpenModalPayment(false))}
      className="ModalPayement"
    >
      <section className="ModalPayment-section">
        {/* Nút đóng modal */}
        {/* <div id="config_root"></div> */}

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
          Nhà hàng: {selectedPlace?.diaChi || "Không có thông tin"}
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
          onClick={() => createPaymentLinkHandle(openPaymentDialog)}
        >
          Thanh toán ngay
        </Button>
      </section>
    </Modal>
  );
};

export default ModalPayment;
