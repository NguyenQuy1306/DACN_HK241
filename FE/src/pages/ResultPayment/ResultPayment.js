import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Toolbar, Button } from "@mui/material";
import SockJS from "sockjs-client";

import { Client } from "@stomp/stompjs";
import PaymentFieldsTableDemo from "../../components/Payment/PaymentFieldsTableDemo";
import OrderTableDemo from "../../components/Payment/OrderTableDemo";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { getOrder, paymentCallback } from "../../redux/features/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../components/Button/ButtonGreen/ButtonBooking/ButtonGreen";
import { useNavigate } from "react-router-dom";
export default function ResultPayment() {
    const [stompClient, setStompClient] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        // Khởi tạo kết nối WebSocket khi component mount
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: { withCredentials: true }, // Sử dụng SockJS làm transport
            onConnect: () => {
                setStompClient(client);
                // alert("Connecting to  websocket server.....");
                // client.subscribe("/topic/messages", (message) => {
                //     console.log("DATA WEBSOCKET NHẬN ĐƯỢC: ", message.body);
                // });
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
            },
            debug: (str) => {
                console.log(str); // Bật debug để xem log
            },
        });

        client.activate(); // Kích hoạt kết nối

        return () => {
            if (client) {
                client.deactivate(); // Ngắt kết nối khi component unmount
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient) {
            // alert("Sent message to websocket");
            stompClient.publish({
                destination: "/app/sendMessage", // Đích đến trên server
                body: "Hello Websocket", // Nội dung message
            });
        }
    };

    useEffect(() => {
        sendMessage();
    }, []);

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
                        paymentCode: pendingOrder.orderCodePayOs,
                    }),
                );
                sendMessage();
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
            <div
                style={{ marginLeft: "600px", paddingBottom: "10px" }}
                onClick={() => navigate(`../Home`)}
            >
                <ButtonGreen text={"Quay về"}></ButtonGreen>
            </div>
        </Box>
    );
}
