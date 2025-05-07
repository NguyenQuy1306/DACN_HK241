import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import {
  getOrder,
  updateStatusRefund,
} from "../../redux/features/paymentSlice";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RefundSuccess() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isCallbackSent, setIsCallbackSent] = useState(false);
  const [refundFailed, setRefundFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let orderCode = null;
  const { orderIdFromPath } = useParams();
  console.log("orderIdFromPath", orderIdFromPath);

  let paramsValue = new URLSearchParams(location.search);
  if (paramsValue.size === 0) {
    orderCode = location.state?.orderCode;
  } else {
    orderCode = paramsValue.get("orderCode");
  }
  console.log("orderCode", orderCode);

  const {
    orderResponse,
    loading: orderLoading,
    updateStatusResponse,
  } = useSelector((state) => ({
    orderResponse: state.payment.getOrder,
    loading: state.payment.loading,
    updateStatusResponse: state.payment.updateStatusResponse,
  }));
  console.log("orderResponse12321", orderResponse);

  useEffect(() => {
    if (orderCode !== null) {
      const orderId = parseInt(orderCode, 10);
      dispatch(getOrder({ orderId }));
    } else {
      setLoading(false);
      setRefundFailed(true);
      setErrorMessage("Không tìm thấy mã đơn hàng");
    }
  }, [orderCode, dispatch]);

  useEffect(() => {
    if (!orderLoading && orderResponse) {
      if (orderResponse.error === 0) {
        setLoading(false);

        if (!isCallbackSent) {
          dispatch(
            updateStatusRefund({
              status: true,
              totalRefund: orderResponse.data["amount"],
              orderId: orderIdFromPath,
            })
          );
          setIsCallbackSent(true);
        }
      } else {
        setLoading(false);
        setRefundFailed(true);
        setErrorMessage(
          orderResponse.message || "Lỗi khi tìm thông tin đơn hàng"
        );
        toast.error(
          "Hoàn tiền thất bại: " +
            (orderResponse.message || "Lỗi không xác định")
        );
      }
    }
  }, [orderResponse, orderLoading, isCallbackSent, orderIdFromPath, dispatch]);

  // Handle update status response
  useEffect(() => {
    if (updateStatusResponse) {
      if (updateStatusResponse.error !== 0) {
        setRefundFailed(true);
        setErrorMessage(
          updateStatusResponse.message ||
            "Cập nhật trạng thái hoàn tiền thất bại"
        );
        toast.error("Cập nhật trạng thái hoàn tiền thất bại");
      }
    }
  }, [updateStatusResponse]);

  // Format currency function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Card
        sx={{ maxWidth: 400, width: "100%", borderRadius: 4, boxShadow: 4 }}
      >
        {!refundFailed &&
        orderResponse &&
        orderResponse.data.status !== "CANCELLED" ? (
          <>
            <CardHeader
              title={
                <Stack alignItems="center" spacing={1}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
                  <Typography variant="h6" color="success.main">
                    Hoàn tiền thành công!
                  </Typography>
                </Stack>
              }
            />
            <CardContent>
              <Stack spacing={2} alignItems="center" textAlign="center">
                {orderResponse.data.transactions &&
                  orderResponse.data.transactions[0] && (
                    <Typography>
                      Mã giao dịch:{" "}
                      <strong>
                        {orderResponse.data.transactions[0].reference}
                      </strong>
                    </Typography>
                  )}
                <Typography>
                  Mã đơn hàng: <strong>#{orderResponse.data.orderCode}</strong>
                </Typography>
                <Typography>
                  Số tiền đã hoàn:{" "}
                  <strong style={{ color: "#e53935" }}>
                    {formatCurrency(orderResponse.data.amount)} VND
                  </strong>
                </Typography>
                <Typography>
                  Trạng thái: <strong>{orderResponse.data.status}</strong>
                </Typography>
                {orderResponse.data.transactions &&
                  orderResponse.data.transactions[0] && (
                    <Typography>
                      Mô tả:{" "}
                      <strong>
                        {orderResponse.data.transactions[0].description}
                      </strong>
                    </Typography>
                  )}

                <Stack spacing={1} width="100%" mt={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => (window.location.href = "/owner/dashboard")}
                  >
                    Về trang chính
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader
              title={
                <Stack alignItems="center" spacing={1}>
                  <ErrorIcon color="error" sx={{ fontSize: 48 }} />
                  <Typography variant="h6" color="error.main">
                    Hoàn tiền không thành công!
                  </Typography>
                </Stack>
              }
            />
            <CardContent>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Alert severity="error" sx={{ width: "100%" }}>
                  Đã huỷ hoàn tiền.
                </Alert>

                {orderCode && (
                  <Typography>
                    Mã đơn hàng: <strong>#{orderCode}</strong>
                  </Typography>
                )}

                {errorMessage && (
                  <Box width="100%" mt={1}>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      align="left"
                      variant="subtitle2"
                      fontWeight="bold"
                    >
                      Chi tiết lỗi:
                    </Typography>
                    <Typography align="left" color="error">
                      {errorMessage}
                    </Typography>
                  </Box>
                )}

                <Box width="100%" mt={1}>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Vui lòng bấm nút "Thử lại" để hoàn tiền lại cho khách hàng.
                  </Alert>
                </Box>

                <Stack spacing={1} width="100%" mt={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.reload()}
                  >
                    Thử lại
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => (window.location.href = "/owner/dashboard")}
                  >
                    Về trang chính
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </>
        )}
      </Card>
    </Box>
  );
}
