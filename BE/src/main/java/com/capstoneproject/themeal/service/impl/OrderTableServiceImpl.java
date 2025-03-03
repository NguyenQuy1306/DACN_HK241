package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFood;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFoodId;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailableId;
import com.capstoneproject.themeal.model.entity.OrderTableHasFood;
import com.capstoneproject.themeal.model.entity.OrderTableHasFoodId;
import com.capstoneproject.themeal.model.entity.OrderTableStatus;
import com.capstoneproject.themeal.model.entity.PaymentMethod;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.entity.TableAvailableId;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.mapper.OrderTableMapper;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.ComboAvailableHasFoodResponse;
import com.capstoneproject.themeal.model.response.FoodResponse;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.repository.ComboAvailableRepository;
import com.capstoneproject.themeal.repository.FoodRepository;
import com.capstoneproject.themeal.repository.OrderTableHasComboAvailableRepository;
import com.capstoneproject.themeal.repository.OrderTableHasFoodRepository;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.TableAvailableRepository;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.ComboAvailableService;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.OrderTableService;
import com.capstoneproject.themeal.service.TableAvailableService;

import jakarta.transaction.Transactional;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderTableServiceImpl implements OrderTableService {
        @Autowired
        private OrderTableRepository orderTableRepository;
        @Autowired
        private TableAvailableRepository tableAvailableRepository;
        @Autowired
        private ComboAvailableRepository comboAvailableRepository;
        @Autowired
        private OrderTableHasComboAvailableRepository orderTableHasComboAvailableRepository;
        @Autowired
        private FoodRepository foodRepository;
        @Autowired
        private OrderTableHasFoodRepository orderTableHasFoodRepository;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private RestaurantRepository restaurantRepository;
        @Autowired
        private ComboAvailableService comboAvailableService;
        @Autowired
        private FoodService foodService;

        @Autowired
        private TableAvailableService tableAvailableService;

        @Override
        public List<OrderTableResponse> getOrderTableByCustomerId(Long customerId) {
                List<OrderTable> orderTables = orderTableRepository.findByMaSoKhachHang(customerId);
                return orderTables.stream().map(OrderTableMapper.INSTANCE::toOrderTableResponse)
                                .collect(Collectors.toList());
        }

        @Override
        public OrderTable saveOrderTable(User user, PaymentMethod paymentMethod, Restaurant restaurant, Short tableId,
                        String statusOrder, Long totalAmount, Long deposit) {
                TableAvailableId tableAvailableId = new TableAvailableId(restaurant.getMaSoNhaHang(), tableId);
                TableAvailable tableAvailable = tableAvailableRepository.findById(tableAvailableId)
                                .orElseThrow(() -> new NotFoundException("Table not found"));

                OrderTable orderTable = OrderTable.builder()
                                .SoKhach(tableAvailable.getSoNguoi())
                                .Ngay(tableAvailable.getNgay())
                                .Gio(tableAvailable.getGio())
                                .TrangThai(OrderTableStatus.valueOf(statusOrder))
                                .StatusDeposit(false)
                                .DepositRefunded(false)
                                .TongTienThanhToan(totalAmount)
                                .TienDatCoc(deposit)
                                .KhachHang(user)
                                .NhaHang(restaurant)
                                .build();
                orderTableRepository.save(orderTable);
                return orderTable;
        }

        @Override
        public void saveOrderTableHasComboAvailable(Long comboId, OrderTable orderTable) {
                ComboAvailable comboAvailable = comboAvailableRepository.findById(comboId)
                                .orElseThrow(() -> new NotFoundException("Combo not found"));
                OrderTableHasComboAvailableId orderTableHasComboAvailableId = new OrderTableHasComboAvailableId(
                                orderTable.getMaSoDatBan(), comboId);
                OrderTableHasComboAvailable orderTableHasComboAvailable = OrderTableHasComboAvailable.builder()
                                .DonDatBan(orderTable)
                                .MaSo(orderTableHasComboAvailableId)
                                .ComboCoSan(comboAvailable)
                                .build();
                orderTableHasComboAvailableRepository.save(orderTableHasComboAvailable);
        }

        @Override
        public OrderTableResponse mapping(OrderTable orderTable) {
                OrderTableMapper mapper = OrderTableMapper.INSTANCE;
                return mapper.toOrderTableResponse(orderTable);

        }

        @Override
        public void saveOrderTableHasFood(OrderTable orderTable, FoodOrderRequest foodOrderRequests) {
                Food food = foodRepository.findById(foodOrderRequests.getMaSoMonAn())
                                .orElseThrow(() -> new NotFoundException("Food not found"));
                OrderTableHasFoodId orderTableHasFoodId = new OrderTableHasFoodId(orderTable.getMaSoDatBan(),
                                foodOrderRequests.getMaSoMonAn());
                OrderTableHasFood orderTableHasFood = OrderTableHasFood.builder()
                                .DonDatBan(orderTable)
                                .MaSo(orderTableHasFoodId)
                                .MonAn(food)
                                .SoLuong(foodOrderRequests.getSoLuong())
                                .build();
                orderTableHasFoodRepository.save(orderTableHasFood);
        }

        @Override
        public void validateOrderRequest(CreateOrderRequest request) {
                if (!tableAvailableService.isTableExists(request.getTableId(), request.getRestaurantId())) {
                        throw new ValidationException("Table does not exist");
                }
                if (request.getComboId() != null
                                && !comboAvailableService.isComboExists(request.getComboId(),
                                                request.getRestaurantId())) {
                        throw new ValidationException("Combo does not exist");
                }
                if (!request.getFoodOrderRequests().isEmpty()) {
                        List<Long> listIdFood = request.getFoodOrderRequests().stream()
                                        .map(FoodOrderRequest::getMaSoMonAn)
                                        .toList();
                        foodService.checkFoodExist(listIdFood);
                }
        }

        @Transactional
        public OrderTableResponse createOrder(CreateOrderRequest request, String statusOrder, Long totalAmount,
                        Long deposit) {
                Long customerID = request.getCustomerID();
                Short tableId = request.getTableId();
                Long comboId = request.getComboId();
                Long restaurantId = request.getRestaurantId();
                List<FoodOrderRequest> foodOrderRequests = request.getFoodOrderRequests();
                // Check exist table with id
                boolean isExisTable = tableAvailableService.isTableExists(tableId, restaurantId);
                if (!isExisTable) {
                        throw new NotFoundException(
                                        "Table IDs not found: " + tableId);
                }
                // Check exist Combo with id
                if (comboId != null) {
                        boolean isExisCombo = comboAvailableService.isComboExists(comboId, restaurantId);

                        if (!isExisCombo) {
                                throw new NotFoundException(
                                                "Combo IDs not found: " + comboId);
                        }
                }
                // Check exist Food with id

                if (foodOrderRequests.size() > 0) {
                        List<Long> listIdFood = foodOrderRequests.stream()
                                        .map(FoodOrderRequest::getMaSoMonAn)
                                        .toList();

                        foodService.checkFoodExist(listIdFood);
                }
                PaymentMethod paymentMethod = new PaymentMethod();
                User customer = userRepository.findById(customerID)
                                .orElseThrow(() -> new NotFoundException("Customer not found"));
                // create Restaurant entity
                Restaurant restaurant = restaurantRepository.findById(restaurantId)
                                .orElseThrow(() -> new NotFoundException("Restaurant not found"));
                // Create OderTalbe entity
                OrderTable orderTable = this.saveOrderTable(customer, paymentMethod, restaurant,
                                tableId, statusOrder, totalAmount, deposit);
                // Create OderTableHasCombo entity if Menu is not null
                if (comboId != null) {
                        this.saveOrderTableHasComboAvailable(comboId, orderTable);
                }
                if (foodOrderRequests.size() > 0) {
                        for (FoodOrderRequest foodOrderRequest : foodOrderRequests) {
                                this.saveOrderTableHasFood(orderTable, foodOrderRequest);
                        }
                }

                return this.mapping(orderTable);

        }

        @Transactional
        public void updateOrderStatusAfterPayment(Long orderId, boolean isSuccess) {
                OrderTable order = orderTableRepository.findById(orderId)
                                .orElseThrow(() -> new NotFoundException("Order not found"));
                if (isSuccess) {
                        order.setTrangThai(OrderTableStatus.COMPLETED);
                } else {
                        order.setTrangThai(OrderTableStatus.CANCELED);
                }
                orderTableRepository.save(order);
        }

}