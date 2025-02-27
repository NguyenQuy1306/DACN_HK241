import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Toolbar } from "@mui/material";
import PaymentFieldsTableDemo from "../../components/Payment/PaymentFieldsTableDemo";
import OrderTableDemo from "../../components/Payment/OrderTableDemo";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { getOrder, paymentCallback } from "../../redux/features/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
export default function ResultPayment() {
  const dispatch = useDispatch();
  const setOrderWithExpiry = (key, value, expiryInMinutes) => {
    const now = Date.now();
    const item = {
      value,
      expiry: now + expiryInMinutes * 60 * 1000, // Chuyển phút thành milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getOrderWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  let order = getOrderWithExpiry("order");

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let orderCode = null;
  let paramsValue = new URLSearchParams(location.search);
  if (paramsValue.size === 0) {
    orderCode = location.state?.orderCode;
  } else {
    orderCode = paramsValue.get("orderCode");
  }
  console.log("orderCode", orderCode);
  console.log("order", order);
  const { orderResponse, loading: orderLoading } = useSelector((state) => ({
    orderResponse: state.payment.getOrder,
    loading: state.payment.loading, // Giả sử Redux có state loading
  }));
  console.log("orderResponse12321", orderResponse);

  useEffect(() => {
    if (orderCode !== null) {
      const orderId = parseInt(orderCode, 10);
      dispatch(getOrder({ orderId }));
    } else {
      setLoading(false);
    }
  }, [orderCode, dispatch]);

  const [isCallbackSent, setIsCallbackSent] = useState(false);

  useEffect(() => {
    if (!orderLoading && orderResponse && orderResponse.error === 0) {
      setLoading(false);
      console.log("set order", orderResponse);

      const pendingOrderString = localStorage.getItem("pendingOrder");
      console.log("pendingOrderString", pendingOrderString);
      if (!pendingOrderString) return;

      const pendingOrder = JSON.parse(pendingOrderString);
      console.log("pendingOrder23", pendingOrder);
      if (!isCallbackSent) {
        dispatch(
          paymentCallback({
            status: orderResponse.data.status,
            orderCode: pendingOrder.orderCode,
          })
        );
        localStorage.removeItem("pendingOrder");
        setIsCallbackSent(true);
      }
      console.log("Before", orderResponse.data);
      setOrderWithExpiry("order", orderResponse.data, 5);
    } else if (orderResponse?.error === -1) {
      toast.warning("Không tìm thấy đơn hàng");
    }
  }, [orderResponse, orderLoading, isCallbackSent]);

  return (
    <Box>
      <ToastContainer />
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <OrderTableDemo data={order} />
          {/* <PaymentFieldsTableDemo data={order?.webhook_snapshot} /> */}
        </Box>
      )}
    </Box>
  );
}
