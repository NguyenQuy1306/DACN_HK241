package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.PaymentCallbackRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.DepositResponse;
import com.capstoneproject.themeal.model.response.PaymentResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.service.DepositService;
import com.capstoneproject.themeal.service.OrderTableService;
import com.capstoneproject.themeal.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private OrderTableService orderTableService;

    @Autowired
    private DepositService depositService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-link")
    public ResponseEntity<?> createPaymentLink(
            @RequestParam(required = false) Integer deposit,
            @RequestBody(required = false) CreateOrderRequest request,
            @RequestParam String returnUrl,
            @RequestParam(required = false) Boolean isRefund,
            @RequestBody(required = false) OrderTable orderTable) {

        try {
            ObjectNode response = paymentService.createPaymentLink(deposit, request, returnUrl, isRefund, orderTable);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("error", -1);
            response.put("message", "fail");
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/getOrderById")
    public ResponseEntity<?> getOrderById(@RequestParam Long orderId) {
        try {
            ObjectNode response = paymentService.getOrderById(orderId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable("orderId") int orderId) {
        try {
            ObjectNode response = paymentService.cancelOrder(orderId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/confirm-webhook")
    public ResponseEntity<?> confirmWebhook(@RequestBody Map<String, String> requestBody) {
        try {
            ObjectNode response = paymentService.confirmWebhook(requestBody);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/payment-callback")
    public ResponseEntity<String> handlePaymentCallback(@RequestBody PaymentCallbackRequest callbackRequest) {
        try {
            boolean success = paymentService.processPaymentCallback(callbackRequest);
            return success ?
                    ResponseEntity.ok("Payment processed successfully") :
                    ResponseEntity.badRequest().body("Payment failed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment: " + e.getMessage());
        }
    }

    @GetMapping("/deposit")
    public ResponseEntity<ApiResponse<DepositResponse>> getDepositByRestaurantId(@RequestParam Long restaurantId) {
        ApiResponse<DepositResponse> apiResponse = new ApiResponse<>();
        try {
            DepositResponse depositResponse = depositService.getDeposit(restaurantId);
            apiResponse.ok(depositResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
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
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @RequestParam Long paymentAmount,
            @RequestParam String maSoThanhToan,
            @RequestParam Long maSoDatBan) {

        ApiResponse<PaymentResponse> apiResponse = new ApiResponse<>();
        try {
            PaymentResponse paymentResponse = orderTableService.createPayment(
                    paymentAmount, maSoThanhToan, maSoDatBan);
            apiResponse.ok(paymentResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
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
    }


}