package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.request.PaymentCallbackRequest;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.OrderPredictProducerService;
import com.capstoneproject.themeal.service.OrderTableService;
import com.capstoneproject.themeal.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;
import vn.payos.type.PaymentLinkData;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PayOS payOS;
    private static final String WEBHOOK_URL = "https://ff74-14-169-38-181.ngrok-free.app/webhook/payos_transfer_handler";

    @Autowired
    private FoodService foodService;

    @Autowired
    private ComboAvailableRepository comboAvailableRepository;

    @Autowired
    private ComboAvailableHasFoodRepository comboAvailableHasFoodRepository;


    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private OrderTableRepository orderTableRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderPredictRepository orderPredictRepository;
    @Autowired
    private OrderPredictProducerService orderPredictProducerService;

    public PaymentServiceImpl() {
        String clientId = "c52168d1-0b63-47b4-ab92-09a6138f05b5";
        String apiKey = "265ad092-714c-4684-982f-7906eea50584";
        String checksumKey = "bdc07e1452e175a62a5f439e1640faf1103e2188545d16050dab43c73f65a070";
        this.payOS = new PayOS(clientId, apiKey, checksumKey);
    }

    @Override
    public ObjectNode createPaymentLink(Integer deposit, CreateOrderRequest request, String returnUrl,
                                        Boolean isRefund, OrderTable orderTable) {
        ObjectNode response = objectMapper.createObjectNode();

        try {
            int amount = deposit != null ? deposit : 10000;
            String currentTimeString = String.valueOf(String.valueOf(new Date().getTime()));
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));
            long now = Instant.now().getEpochSecond();

            PaymentData paymentData = PaymentData.builder()
                    .description("Đặt bàn ăn")
                    .orderCode(orderCode)
                    .amount(amount)
                    .returnUrl(returnUrl)
                    .cancelUrl(returnUrl)
                    .build();

            if (isRefund != null && isRefund) {
                configureRefundPayment(paymentData, now, orderTable);
            } else {
                configureDepositPayment(paymentData, now, request);
            }

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);
            response.put("error", 0);
            response.put("message", "success");
            response.set("data", objectMapper.valueToTree(data));

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create payment link: " + e.getMessage());
        }
    }

    private void configureRefundPayment(PaymentData paymentData, long now, OrderTable orderTable) {
        long expirationTime = now + (24 * 60 * 60); // 24 hours
        paymentData.setExpiredAt(expirationTime);
        paymentData.setDescription("Hoàn phí đặt bàn");
    }

    private void configureDepositPayment(PaymentData paymentData, long now, CreateOrderRequest request) {
        long expirationTime = now + (5 * 60); // 5 minutes
        paymentData.setExpiredAt(expirationTime);
        paymentData.setDescription("Đặt cọc bàn ăn");

        if (request != null && request.getFoodOrderRequests() != null && !request.getFoodOrderRequests().isEmpty()) {
            handleFoodOrders(paymentData, request.getFoodOrderRequests());
        } else if (request != null && request.getComboId() != null) {
            handleComboOrder(paymentData, request.getComboId());
        }
    }

    private void handleFoodOrders(PaymentData paymentData, List<FoodOrderRequest> foodOrderRequests) {
        List<Long> listIdFood = foodOrderRequests.stream()
                .map(FoodOrderRequest::getMaSoMonAn)
                .toList();

        foodService.checkFoodExist(listIdFood);

        for (FoodOrderRequest foodOrderRequest : foodOrderRequests) {
            ItemData itemData = ItemData.builder()
                    .name(foodOrderRequest.getTen())
                    .quantity(foodOrderRequest.getSoLuong() != null ? foodOrderRequest.getSoLuong().intValue() : 0)
                    .price(foodOrderRequest.getGia() != null ? foodOrderRequest.getGia().intValue() : 0)
                    .build();
            paymentData.addItem(itemData);
        }
    }

    private void handleComboOrder(PaymentData paymentData, Long comboId) {
        List<Food> foods = comboAvailableHasFoodRepository.findFoodWithComboId(comboId);

        if (foods.isEmpty()) {
            throw new ApplicationException("Không tìm thấy món ăn trong combo");
        }

        for (Food food : foods) {
            ItemData itemData = ItemData.builder()
                    .name(food.getTen())
                    .quantity(1)
                    .price(food.getGia() != null ? food.getGia().intValue() : 0)
                    .build();
            paymentData.addItem(itemData);
        }
    }

    @Override
    public ObjectNode getOrderById(Long orderId) {
        ObjectNode response = objectMapper.createObjectNode();

        try {
            PaymentLinkData order = payOS.getPaymentLinkInformation(orderId);
            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get order by ID: " + e.getMessage());
        }
    }

    @Override
    public ObjectNode cancelOrder(int orderId) {
        ObjectNode response = objectMapper.createObjectNode();

        try {
            PaymentLinkData order = payOS.cancelPaymentLink(orderId, null);
            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to cancel order: " + e.getMessage());
        }
    }

    @Override
    public ObjectNode confirmWebhook(Map<String, String> requestBody) {
        ObjectNode response = objectMapper.createObjectNode();

        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            response.set("data", objectMapper.valueToTree(str));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to confirm webhook: " + e.getMessage());
        }
    }

    @Transactional
    public void updateOrderStatusAfterPayment(Long orderId, boolean isSuccess, String paymentCode) {
        OrderTable order = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));
        Payment payment = paymentRepository.findById(paymentCode)
                .orElseThrow(() -> new NotFoundException("Payment not found"));
        if (isSuccess) {
            order.setTrangThai(OrderTableStatus.PAID_PENDING_USE);
            payment.setPaymentStatus(PaymentStatus.PAID);
        } else {
            order.setTrangThai(OrderTableStatus.NOT_PAID);
            payment.setPaymentStatus(PaymentStatus.NONE);
        }
        orderTableRepository.save(order);
        paymentRepository.save(payment);

    }

    @Override
    public void sendOrderEvent(Long orderId, Double distanceKm) {
        OrderTable order = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));
        Long paidCount = orderTableRepository.countByCustomerAndStatus(order.getKhachHang().getMaSoNguoiDung(),
                OrderTableStatus.COMPLETED);
        Long cancelCount = orderTableRepository.countByCustomerAndStatus(
                order.getKhachHang().getMaSoNguoiDung(), OrderTableStatus.CANCELLED_REFUNDED);
        Long totalCount = paidCount + cancelCount;
        double avgUserCancelRate = cancelCount == 1 ? 0 : (paidCount / (double) cancelCount);
        double roundedRate = Math.round(avgUserCancelRate * 100.0) / 100.0;
        OrderPredict orderPredict = OrderPredict.builder()
                .paymentStatus(order.getTrangThai().toString())
                .avgUserCancelRate(roundedRate)
                .userId(order.getKhachHang().getMaSoNguoiDung())
                .orderId(orderId)
                .bookingTime(order.getOrderAt().toString())
                .dayOfWeek(order.getOrderAt().getDayOfWeek().getValue())
                .reservationTime(order.getGio().toString())
                .reservationDate(order.getNgay().toString())
                .userDistanceKm(distanceKm)
                .numGuests(order.getSoKhach())
                .isFirstBooking(totalCount == 0 ? Boolean.TRUE : Boolean.FALSE)
                .build();
        orderPredictRepository.save(orderPredict);
        orderPredictProducerService.sendBookingRequestEvent(orderPredict);

    }

    @Transactional
    public boolean processPaymentCallback(PaymentCallbackRequest callbackRequest) {
        Long orderCode = callbackRequest.getOrderCode();
        String status = callbackRequest.getStatus();
        String paymentCode = callbackRequest.getPaymentCode();
        Double distanceKm = callbackRequest.getDistanceKm();

        boolean isPaid = "PAID".equalsIgnoreCase(status);

        // Update order status
        updateOrderStatusAfterPayment(orderCode, isPaid, paymentCode);

        sendOrderEvent(orderCode, distanceKm);

        return isPaid;
    }

}