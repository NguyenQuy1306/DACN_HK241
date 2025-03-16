import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { usePayOS } from "@payos/payos-checkout";
import { Client } from "@stomp/stompjs";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useScript from "react-script-hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SockJS from "sockjs-client";
import CustomizedTables from "../../../features/Detail/DetailBox/Navigation/Menu/Component/TableInModalMenu/TableInModalMenu";
import { createOrder } from "../../../redux/features/orderSlice";
import {
    createPayment,
    createPaymentLink,
    getDepositPolicy,
    saveDeposit,
    savePaymentAmount,
    setPaymentStatus,
} from "../../../redux/features/paymentSlice";
import { setOpenModalPayment } from "../../../redux/features/tableSlice";
import "./ModalPayment.css";

const { formatCurrency } = require("../../../helper/helper");
const ModalPayment = ({ open, selectedPlace }) => {
    const [stompClient, setStompClient] = useState(null);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // State hooks
    // const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isCreatingLink, setIsCreatingLink] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const [openDialogLoading, setOpenDialogLoading] = useState(false);
    // Redux state
    const [paymentType, setPaymentType] = useState("deposit");

    // Xác định số tiền thanh toán dựa trên lựa chọn
    const menuChoosed = useSelector((state) => state.restaurant.menuChoosed);
    const totalAmount = useSelector((state) => state.payment.amount);
    const deposit = useSelector((state) => state.payment.deposit);
    const choosedTable = useSelector((state) => state.table.choosedTable);
    const user = useSelector((state) => state.authentication.user);
    const bookingWithNewCombo = useSelector((state) => state.restaurant.bookingWithNewCombo);
    // Load script PayOS
    const [loading, error] = useScript({
        src: process.env.REACT_APP_PAYOS_SCRIPT,
        checkForExisting: true,
    });

    const RETURN_URL = `${window.location.href}/ResultPayment/`;
    const CANCEL_URL = `${window.location.href}/ResultPayment/`;
    const depositPolicy = useSelector((state) => state.payment.depositPolicy);
    const paymentAmount = useSelector((state) => state.payment.paymentAmount);

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

    const payOSConfig = {
        RETURN_URL: RETURN_URL,
        ELEMENT_ID: "config_root",
        CHECKOUT_URL: checkoutUrl,
        onExit: (eventData) => {
            console.log("Payment exit:", eventData);
        },
        onSuccess: (eventData) => {
            console.log("Payment success:", eventData);
            sendMessage();
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
    const location_id = localStorage.getItem("selectedPlaceId");
    React.useEffect(() => {
        dispatch(getDepositPolicy({ restaurantId: location_id }));
    }, [dispatch, location_id]);
    useEffect(() => {
        if (message) {
            console.log("Người dùng đã hoàn thành thanh toán!");
        }
    }, [message]);

    useEffect(() => {
        if (checkoutUrl) {
            openPayOS();
        }
    }, [checkoutUrl]);
    useEffect(() => {
        const status = searchParams.get("status");

        if (status === "PAID") {
            openPayOS();
        }
    }, [searchParams]);

    useEffect(() => {
        if (paymentType === "deposit") {
            dispatch(savePaymentAmount(deposit));
        } else {
            dispatch(savePaymentAmount(totalAmount));
        }
    }, [paymentType]);

    const paymentAmountWithoutMenu = useMemo(() => {
        if (menuChoosed.length === 0 && depositPolicy) {
            dispatch(savePaymentAmount(depositPolicy.datCocToiThieu));
            dispatch(saveDeposit(depositPolicy.datCocToiThieu));
            return depositPolicy.datCocToiThieu;
        }

        return 0;
    }, [depositPolicy]);
    const createPaymentLinkHandle = async (callbackFunction) => {
        try {
            setOpenDialogLoading(true);
            setIsCreatingLink(true);

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

            const orderResponse = await dispatch(
                createOrder({
                    request: orderPayload,
                    totalAmount: totalAmount,
                    deposit: deposit,
                }),
            ).unwrap();

            if (!orderResponse || orderResponse.error) {
                throw new Error("Tạo đơn hàng thất bại!");
            }
            console.log("menuChoosed", menuChoosed);
            console.log("paymentAmount", paymentAmount);
            // const deposit = 10000;
            const response = await dispatch(
                createPaymentLink({
                    request: orderPayload,
                    deposit: paymentAmount,
                    RETURN_URL,
                }),
            ).unwrap();
            console.log("responseresponse", response.data);

            if (!response || response.error) {
                sendMessage();
                throw new Error("Tạo link thanh toán thất bại!");
            }
            const paymentResponse = await dispatch(
                createPayment({
                    paymentAmount: paymentAmount,
                    maSoThanhToan: response.data.paymentLinkId,
                }),
            );
            localStorage.setItem(
                "pendingOrder",
                JSON.stringify({
                    orderCode: orderResponse.maSoDatBan,
                    orderCodePayOs: response.data.paymentLinkId,
                    timeStamp: Date.now(),
                    checkoutUrl: response.data.checkoutUrl,
                    restaurantName: selectedPlace.ten,
                }),
            );
            console.log("response.data", response.data);
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
            sendMessage();
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
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="primary"
                    >
                        Xác nhận đặt bàn
                    </Typography>
                    <img
                        src={require("../../../assets/images/logo.png")}
                        alt="Logo"
                        style={{ width: "50px", borderRadius: "8px" }}
                    />
                </Box>
                {/* Địa chỉ nhà hàng */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    Nhà hàng: {selectedPlace?.diaChi || "Không có thông tin"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Thông tin đặt bàn */}
                <Box className="ModalPayment-div2-bookdetail">
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                    >
                        Chi tiết đặt bàn
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Typography>Ngày đến:</Typography>
                        <Typography fontWeight="bold">{choosedTable?.ngay || "N/A"}</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Typography>Giờ ăn:</Typography>
                        <Typography fontWeight="bold">{choosedTable?.gio || "N/A"}</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Typography>Số khách:</Typography>
                        <Typography fontWeight="bold">{choosedTable?.soNguoi || "N/A"}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                {/* Thông tin khách hàng */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                >
                    Thông tin khách hàng
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={1}
                >
                    <Typography>Họ tên:</Typography>
                    <Typography fontWeight="bold">{user?.hoTen || "N/A"}</Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={1}
                >
                    <Typography>Email:</Typography>
                    <Typography fontWeight="bold">{user?.email || "N/A"}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                {/* Thông tin Menu đã chọn */}
                {menuChoosed.length > 0 && (
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary"
                        >
                            Món đã chọn
                        </Typography>
                        <CustomizedTables combo={menuChoosed} />
                    </Box>
                )}

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                >
                    Thông tin thanh toán
                </Typography>
                {menuChoosed.length > 0 && (
                    <Box mb={2}>
                        <FormLabel component="legend">Chọn phương thức thanh toán:</FormLabel>
                        <RadioGroup
                            row
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <FormControlLabel
                                value="deposit"
                                color="primary"
                                control={<Radio />}
                                label={`Đặt cọc (${formatCurrency(deposit)} VND)`}
                            />
                            <FormControlLabel
                                value="full"
                                control={<Radio />}
                                color="primary"
                                label={`Thanh toán toàn bộ (${formatCurrency(totalAmount)} VND)`}
                            />
                        </RadioGroup>
                    </Box>
                )}
                {menuChoosed.length === 0 && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Typography> Tiền đặt cọc:</Typography>
                        <Typography
                            fontWeight="bold"
                            color="primary"
                        >
                            {deposit ? `${formatCurrency(deposit)} VND` : "N/A"}
                        </Typography>
                    </Box>
                )}
                <Box mt={1}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                    >
                        Khoản đặt cọc/thanh toán này được tự động thêm nhằm tuân theo chính sách của nhà hàng.
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => window.open("/deposit-policy")}
                    sx={{ mt: 2 }}
                >
                    Chi tiết chính sách thanh toán
                </Button>

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
