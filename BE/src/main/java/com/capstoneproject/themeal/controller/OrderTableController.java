package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.PaymentMethod;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.mapper.OrderTableMapper;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.request.TableRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.model.response.RestaurantInMapsResponse;
import com.capstoneproject.themeal.repository.PaymentMethodRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.ComboAvailableService;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.OrderTableService;
import com.capstoneproject.themeal.service.TableAvailableService;
import com.capstoneproject.themeal.service.impl.OrderTableServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/orders")
public class OrderTableController {

    // Create Order POST /api/orders
    // Get All Orders GET /api/orders
    // Get Order by ID GET /api/orders/{orderId}
    // Update Order PUT/PATCH /api/orders/{orderId}
    // Cancel Order DELETE /api/orders/{orderId}
    // Get Orders by Table GET /api/orders/table/{tableId}
    // Get Orders by Status GET /api/orders/status/{status}
    // Assign Waiter PUT/PATCH /api/orders/{orderId}/waiter
    @Autowired
    private OrderTableService orderTableService;
    @Autowired
    private TableAvailableService tableAvailableService;
    @Autowired
    private ComboAvailableService comboAvailableService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private FoodService foodService;

    @GetMapping("/customer/{customerId}/history")
    List<OrderTableResponse> getAllOrderByCustomerId(@PathVariable Long customerId) {
        return orderTableService.getOrderTableByCustomerId(customerId);
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<OrderTableResponse>> createOrder(
            @RequestBody CreateOrderRequest request) {

        ApiResponse<OrderTableResponse> apiResponse = new ApiResponse<>();
        try {
            OrderTableResponse orderOrderTableResponse = orderTableService.createOrder(request, "PENDING");
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
}
