package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.request.PaymentCallbackRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.DepositResponse;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.model.response.PaymentResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.repository.ComboAvailableHasFoodRepository;
import com.capstoneproject.themeal.repository.ComboAvailableRepository;
import com.capstoneproject.themeal.service.DepositService;
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
import java.util.HashMap;
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
    @Autowired
    private ComboAvailableRepository comboAvailableRepository;
    @Autowired
    private ComboAvailableHasFoodRepository comboAvailableHasFoodRepository;
    @Autowired
    private DepositService depositService;

    public PaymentController() {
        String clientId = "c52168d1-0b63-47b4-ab92-09a6138f05b5";
        String apiKey = "265ad092-714c-4684-982f-7906eea50584";
        String checksumKey = "bdc07e1452e175a62a5f439e1640faf1103e2188545d16050dab43c73f65a070";
        this.payOS = new PayOS(clientId, apiKey, checksumKey);
    }

    @PostMapping("/create-payment-link")
    public ResponseEntity<?> createPaymentLink(
            @RequestParam(required = false) Integer deposit,
            @RequestBody(required = false) CreateOrderRequest request, @RequestParam String returnUrl) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        System.out.println("reate-payment-link2323" + deposit);
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
            if (request.getFoodOrderRequests() != null && request.getFoodOrderRequests().size() > 0) {
                List<FoodOrderRequest> foodOrderRequests = request.getFoodOrderRequests();
                if (foodOrderRequests.size() > 0) {
                    List<Long> listIdFood = foodOrderRequests.stream()
                            .map(FoodOrderRequest::getMaSoMonAn)
                            .toList();

                    foodService.checkFoodExist(listIdFood);
                }
                if (foodOrderRequests.size() > 0) {
                    System.out.println("odOrderRequests.size()" + foodOrderRequests.size());

                    for (FoodOrderRequest foodOrderRequest : foodOrderRequests) {
                        ItemData itemData = (ItemData.builder()
                                .name(foodOrderRequest.getTen())
                                .quantity(
                                        foodOrderRequest.getSoLuong() != null ? foodOrderRequest.getSoLuong().intValue()
                                                : 0)
                                .price(foodOrderRequest.getGia() != null ? foodOrderRequest.getGia().intValue() : 0)

                                .build());
                        paymentData.addItem(itemData);
                    }
                } else if (request.getComboId() != null) {
                    System.out.println("reate-payment-getComboId" + request.getComboId());

                    // ComboAvailable comboAvailable =
                    // comboAvailableRepository.findById(request.getComboId())
                    // .orElseThrow(() -> new NotFoundException("Combo not found"));
                    List<Food> lFoods = comboAvailableHasFoodRepository.findFoodWithComboId(request.getComboId());
                    if (lFoods.size() > 0) {
                        for (Food food : lFoods) {
                            ItemData itemData = (ItemData.builder()
                                    .name(food.getTen())
                                    .quantity(1))
                                    .price(food.getGia() != null ? food.getGia().intValue() : 0)

                                    .build();
                            paymentData.addItem(itemData);
                        }
                    }
                } else {
                    throw new ApplicationException("Lỗi parameter foodOrderRequest");
                }
            }
            System.out.println("paymentData.size" + paymentData.getItems().size());
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
            String paymentCode = callbackRequest.getPaymentCode();
            if ("PAID".equalsIgnoreCase(status)) {
                // Update order status

                orderTableService.updateOrderStatusAfterPayment(orderCode, true, paymentCode);
                return ResponseEntity.ok("Payment processed successfully");
            } else {
                orderTableService.updateOrderStatusAfterPayment(orderCode, false, paymentCode);

                return ResponseEntity.badRequest().body("Payment failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment");
        }
    }

    @GetMapping("/deposit")
    public ResponseEntity<ApiResponse<DepositResponse>> getDepositByRestaurantId(@RequestParam Long restaurantId) {
        ApiResponse<DepositResponse> apiResponse = new ApiResponse<>();
        try {
            DepositResponse depositResponse = depositService.getDeposit(restaurantId);
            apiResponse.ok(depositResponse);
        } catch (NotFoundException e) {
            apiResponse.error(ResponseCode.getError(10));
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        } catch (ValidationException e) {
            apiResponse.error(ResponseCode.getError(1));
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(@RequestParam Long paymentAmount,
            @RequestParam String maSoThanhToan) {
        ApiResponse<PaymentResponse> apiResponse = new ApiResponse<>();
        try {
            PaymentResponse paymentResponse = orderTableService.createPayment(paymentAmount, maSoThanhToan);
            apiResponse.ok(paymentResponse);
        } catch (NotFoundException e) {
            apiResponse.error(ResponseCode.getError(10));
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        } catch (ValidationException e) {
            apiResponse.error(ResponseCode.getError(1));
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("message", e.getMessage() != null ? e.getMessage() : "Internal Server Error");
            apiResponse.error(errorMap);
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}