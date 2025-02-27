package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.request.PaymentCallbackRequest;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.OrderTableService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;
import vn.payos.type.PaymentLinkData;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {
    @Autowired
    private OrderTableService orderTableService;
    private final PayOS payOS;
    private static final String WEBHOOK_URL = "https://ff74-14-169-38-181.ngrok-free.app/webhook/payos_transfer_handler";
    @Autowired
    private FoodService foodService;

    public PaymentController() {
        String clientId = "c52168d1-0b63-47b4-ab92-09a6138f05b5";
        String apiKey = "265ad092-714c-4684-982f-7906eea50584";
        String checksumKey = "bdc07e1452e175a62a5f439e1640faf1103e2188545d16050dab43c73f65a070";
        this.payOS = new PayOS(clientId, apiKey, checksumKey);
    }

    @GetMapping("/create-payment-link")
    public ResponseEntity<?> createPaymentLink(
            @RequestParam(required = false) Integer deposit,
            @RequestBody(required = false) CreateOrderRequest request, @RequestParam String returnUrl) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        System.out.println("reate-payment-link2323");
        try {

            int amount = deposit != null ? deposit : 10000;
            String currentTimeString = String.valueOf(String.valueOf(new Date().getTime()));
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));
            String domain = "http://localhost:3000";
            long now = Instant.now().getEpochSecond(); // Lấy Unix Timestamp hiện tại (giây)
            long expirationTime = now + (5 * 60); // Hết hạn sau 15 phút (900 giây)

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderCode)
                    .amount(amount)
                    .description("Đặt cọc bàn ăn")
                    .returnUrl(returnUrl)
                    .cancelUrl(returnUrl)
                    .expiredAt(expirationTime)
                    .build();
            List<FoodOrderRequest> foodOrderRequests = request.getFoodOrderRequests();
            if (foodOrderRequests.size() > 0) {
                List<Long> listIdFood = foodOrderRequests.stream()
                        .map(FoodOrderRequest::getMaSoMonAn)
                        .toList();

                foodService.checkFoodExist(listIdFood);
            }
            if (foodOrderRequests.size() > 0) {
                for (FoodOrderRequest foodOrderRequest : foodOrderRequests) {
                    ItemData itemData = (ItemData.builder()
                            .name(foodOrderRequest.getTen())
                            .quantity(foodOrderRequest.getSoLuong() != null ? foodOrderRequest.getSoLuong().intValue()
                                    : 0)
                            .price(foodOrderRequest.getGia() != null ? foodOrderRequest.getGia().intValue() : 0)

                            .build());
                    paymentData.addItem(itemData);
                }
            }

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);
            response.put("error", 0);
            response.put("message", "success");
            response.set("data", objectMapper.valueToTree(data));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", "fail");
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/getOrderById")
    public ObjectNode getOrderById(@RequestParam Long orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            PaymentLinkData order = payOS.getPaymentLinkInformation(orderId);

            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }

    }

    @PostMapping(path = "/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            PaymentLinkData order = payOS.cancelPaymentLink(orderId, null);
            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

    @PostMapping(path = "/confirm-webhook")
    public ObjectNode confirmWebhook(@RequestBody Map<String, String> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            response.set("data", objectMapper.valueToTree(str));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

    @PostMapping("/payment-callback")
    public ResponseEntity<String> handlePaymentCallback(
            @RequestBody PaymentCallbackRequest callbackRequest) {
        try {
            Long orderCode = callbackRequest.getOrderCode();
            String status = callbackRequest.getStatus();

            if ("PAID".equalsIgnoreCase(status)) {
                // Update order status

                orderTableService.updateOrderStatusAfterPayment(orderCode, true);
                return ResponseEntity.ok("Payment processed successfully");
            } else {
                orderTableService.updateOrderStatusAfterPayment(orderCode, false);

                return ResponseEntity.badRequest().body("Payment failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment");
        }
    }
}