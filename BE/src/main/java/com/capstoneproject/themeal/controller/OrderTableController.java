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

import java.util.List;

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

        Long customerID = request.getCustomerID();
        Short tableId = request.getTableId();
        Long comboId = request.getComboId();
        Long restaurantId = request.getRestaurantId();
        List<FoodOrderRequest> foodOrderRequests = request.getFoodOrderRequests();
        System.out.println("calling myfren " + foodOrderRequests.size());
        System.out.println("calling customerID " + customerID);
        System.out.println("calling tableId " + tableId);
        System.out.println("calling restaurantId " + restaurantId);

        ApiResponse<OrderTableResponse> apiResponse = new ApiResponse<>();
        try {
            // Check exist table with id
            boolean isExisTable = tableAvailableService.isTableExists(tableId, restaurantId);
            if (!isExisTable) {
                apiResponse.error(ResponseCode.getError(29));
                return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            // Check exist Combo with id
            if (comboId != null) {
                boolean isExisCombo = comboAvailableService.isComboExists(comboId, restaurantId);

                if (!isExisCombo) {
                    apiResponse.error(ResponseCode.getError(30));
                    return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            // Check exist Food with id

            if (foodOrderRequests.size() > 0) {
                List<Long> listIdFood = foodOrderRequests.stream()
                        .map(FoodOrderRequest::getMaSoMonAn)
                        .toList();
                System.out.println("calling listIdFood " + listIdFood);

                foodService.checkFoodExist(listIdFood);
                System.out.println("calling tableId2222222 " + tableId);

            }
            // Create User entity
            // PaymentMethod paymentMethod = paymentMethodRepository.findById(restaurantId)
            // .orElseThrow(() -> new ResourceNotFoundException("Payment Method not
            // found"));
            PaymentMethod paymentMethod = new PaymentMethod();
            User customer = userRepository.findById(customerID)
                    .orElseThrow(() -> new NotFoundException("Customer not found"));
            // create Restaurant entity
            Restaurant restaurant = restaurantRepository.findById(restaurantId)
                    .orElseThrow(() -> new NotFoundException("Restaurant not found"));
            // Create OderTalbe entity
            OrderTable orderTable = orderTableService.saveOrderTable(customer, paymentMethod, restaurant, tableId);
            // Create OderTableHasCombo entity if Menu is not null
            if (comboId != null) {
                orderTableService.saveOrderTableHasComboAvailable(comboId, orderTable);
            }
            if (foodOrderRequests.size() > 0) {
                for (FoodOrderRequest foodOrderRequest : foodOrderRequests) {
                    orderTableService.saveOrderTableHasFood(orderTable, foodOrderRequest);
                }
            }
            apiResponse.ok(orderTableService.mapping(orderTable));
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
}
