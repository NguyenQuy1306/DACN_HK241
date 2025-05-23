package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.service.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.mapper.OrderTableMapper;
import com.capstoneproject.themeal.repository.PaymentMethodRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.impl.OrderTableServiceImpl;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/orders")
public class OrderTableController {

    @Value("${url.client}")
    private String urlClient;
    @Autowired
    private OrderTableService orderTableService;

    @GetMapping("/customer/{customerId}/history")
    List<OrderTableResponse> getAllOrderByCustomerId(@PathVariable Long customerId) {
        return orderTableService.getOrderTableByCustomerId(customerId);
    }

    @GetMapping("/all/{restaurantId}")
    ResponseEntity<ApiResponse<List<FinalOrderTableResponse>>> getAllOrderByRestaurantId(
            @PathVariable Long restaurantId) {
        ApiResponse<List<FinalOrderTableResponse>> apiResponse = new ApiResponse<>();
        List<FinalOrderTableResponse> orderTableResponses = orderTableService.getAllOrdersByRestaurantId(restaurantId);
        apiResponse.ok(orderTableResponses);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/updateOrderStatus")
    ResponseEntity<ApiResponse<?>> updateOrderStatus(
            @RequestParam Long restaurantId, @RequestParam String newStatus, @RequestParam Long orderId) {
        ApiResponse apiResponse = new ApiResponse<>();
        orderTableService.updateOrderStatus(restaurantId, orderId, newStatus);
        apiResponse.ok("Update order status by owner successful");
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/all")
    List<OrderTableResponse> getAllOrders() {
        return orderTableService.getAllOrders();
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<OrderTableResponse>> createOrder(
            @RequestBody CreateOrderRequest request, @RequestParam Long totalAmount, @RequestParam Long deposit) {

        ApiResponse<OrderTableResponse> apiResponse = new ApiResponse<>();
        try {
            OrderTableResponse orderOrderTableResponse = orderTableService.createOrder(request, "PENDING",
                    totalAmount, deposit);
            apiResponse.ok(orderOrderTableResponse);
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

    @PutMapping("")
    public ResponseEntity<ApiResponse<String>> updateIsArrivalCustormer(@RequestBody Long userId,
            @RequestBody Long orderID, @RequestBody Boolean isArrival) {

        ApiResponse<String> apiResponse = new ApiResponse<>();
        try {
            orderTableService.updateIsArrivalCustomer(userId, isArrival, orderID);
            apiResponse.ok("Update order arrival success");
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

    @GetMapping("/{bookingId}/confirm-arrival")
    public ResponseEntity<String> confirmArrival(@PathVariable Long bookingId) {
        Boolean check = orderTableService.isConfirmed(bookingId);
        if (check) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(urlClient + "/confirmed-order"))
                    .build();
        }
        orderTableService.markAsConfirmed(bookingId, OrderTableStatus.COMFIRMED_GOING_TO.toString());

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(urlClient + "/thank-you"))
                .build();

    }

    @GetMapping("/{bookingId}/cancel-arrival")
    public ResponseEntity<String> cancelArrival(@PathVariable Long bookingId) {
        Boolean check = orderTableService.isConfirmed(bookingId);

        if (check) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(urlClient + "/confirmed-order"))
                    .build();
        }
        orderTableService.markAsConfirmed(
                bookingId,
                OrderTableStatus.CANCELLED_REFUNDED.toString());

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(urlClient + "/thank-you"))
                .build();

    }

    @GetMapping("/refundByOwner/{bookingId}")
    public ResponseEntity<String> refundByOwner(@PathVariable Long bookingId) {

        ObjectNode paymentLink = orderTableService.refundByOwner(bookingId);

        String checkoutUrl = null;
        if (paymentLink != null && paymentLink.has("data")) {
            JsonNode dataNode = paymentLink.get("data");
            if (dataNode.has("checkoutUrl")) {
                checkoutUrl = dataNode.get("checkoutUrl").asText();
            }
        }

        if (checkoutUrl != null) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(checkoutUrl))
                    .build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error");
        }

    }

    @PutMapping(path = "/orderRefund")
    public ResponseEntity<?> updateStatusRefund(@RequestParam Boolean status, @RequestParam Long totalRefund,
            @RequestParam Long orderId) {
        try {
            ApiResponse<String> apiResponse = new ApiResponse<>();
            orderTableService.updateStatusRefund(status, totalRefund, orderId);
            apiResponse.ok("Update order arrival success");
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/rate/{restaurantId}")
    public ResponseEntity<List<OverbookingRateRequest>> getOverbookingRateByTimeSlot(
            @PathVariable Long restaurantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime) {

        if (startTime == null) {
            startTime = LocalTime.of(0, 0); // 00:00
        }
        if (endTime == null) {
            endTime = LocalTime.of(23, 59, 59, 999999999); // 24:00 (the last moment of the day)
        }
        List<OverbookingRateRequest> rate = orderTableService.getOverbookingRateByTimeSlot(
                restaurantId, startTime, endTime);
        return ResponseEntity.ok(rate);
    }

}
