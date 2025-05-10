package com.capstoneproject.themeal.service.impl;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.request.OverbookingRateRequest;
import com.capstoneproject.themeal.model.response.FinalOrderTableResponse;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.mapper.OrderTableMapper;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.model.response.PaymentResponse;

import jakarta.transaction.Transactional;

@Service
public class OrderTableServiceImpl implements OrderTableService {
    @Value("${url.client}")
    private String urlClient;
    private final static double DEFAULT_ALPHA = 0.3;
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
    private PaymentRepository paymentRepository;
    @Autowired
    private TableAvailableService tableAvailableService;

    @Autowired
    private OrderTableMapper orderTableMapper;
    @Autowired
    private OrderPredictProducerService orderPredictProducerService;
    @Autowired
    private OrderTrainingProducerService orderTrainingProducerService;
    @Autowired
    private OrderPredictRepository orderPredictRepository;

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private DepositRepository depositRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OrderTrainingEventRepository orderTrainingEventRepository;

    @Override
    public List<OrderTableResponse> getOrderTableByCustomerId(Long customerId) {
        List<OrderTable> orderTables = orderTableRepository.findByMaSoKhachHang(customerId);
        return orderTables.stream().map(OrderTableMapper.INSTANCE::toOrderTableResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderTableResponse> getAllOrders() {
        System.out.println("------------------------- Getting All Order Tables ------------------------");
        List<OrderTable> orderTables = orderTableRepository.findAll();
        return orderTables.stream().map(OrderTableMapper.INSTANCE::toOrderTableResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<FinalOrderTableResponse> getAllOrdersByRestaurantId(Long restaurantId) {
        List<OrderTable> orderTables = orderTableRepository.findByRestaurantId(restaurantId);
        return orderTables.stream().map(
                orderTable -> orderTableMapper.toFinalOrderTableResponse(orderTable, foodRepository))
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
                .StatusDepositRefund(false)
                .TongTienThanhToan(totalAmount)
                .TienDatCoc(deposit)
                .orderAt(LocalDateTime.now())
                .KhachHang(user)
                .NhaHang(restaurant)
                .isArrival(false)
                .TotalRefund(0L)
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
    public void updateOrderStatus(Long restaurantId, Long orderId, String newStatus) {
        OrderTable orderTable = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));
        if (newStatus.equals("COMPLETED")) {
            orderTable.setTrangThai(OrderTableStatus.COMPLETED);
            orderTable.setIsArrival(true);
        } else {
            orderTable.setTrangThai(OrderTableStatus.CANCELLED_REFUNDED);
            orderTable.setIsArrival(false);
        }
        updateIsArrivalCustomer(orderTable.getKhachHang().getMaSoNguoiDung(), orderTable.getIsArrival(), orderId);
        orderTableRepository.save(orderTable);
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

        if (foodOrderRequests.size() > 0) {
            List<Long> listIdFood = foodOrderRequests.stream()
                    .map(FoodOrderRequest::getMaSoMonAn)
                    .toList();

            foodService.checkFoodExist(listIdFood);
        }
        PaymentMethod paymentMethod = new PaymentMethod();
        User customer = userRepository.findById(customerID)
                .orElseThrow(() -> new NotFoundException("Customer not found"));
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NotFoundException("Restaurant not found"));
        OrderTable orderTable = this.saveOrderTable(customer, paymentMethod, restaurant,
                tableId, statusOrder, totalAmount, deposit);
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

    @Override
    public void updateIsArrivalCustomer(Long userId, boolean isArrival, Long orderId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        OrderTable order = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        order.setIsArrival(isArrival);
        orderTableRepository.save(order);
        OrderPredict orderPredict = orderPredictRepository.findOrder(userId, orderId)
                .orElseThrow(() -> new NotFoundException("OrderPredict not found"));
        OrderTrainingEvent orderTrainingEvent = OrderTrainingEvent
                .builder()
                .paymentStatus(order.getTrangThai().toString())
                .avgUserCancelRate(orderPredict.getAvgUserCancelRate())
                .userId(order.getKhachHang().getMaSoNguoiDung())
                .orderId(orderId)
                .bookingTime(order.getOrderAt().toString())
                .dayOfWeek(order.getOrderAt().getDayOfWeek().getValue())
                .reservationTime(order.getGio().toString())
                .reservationDate(order.getNgay().toString())
                .userDistanceKm(orderPredict.getUserDistanceKm())
                .usedTraining(false)
                .numGuests(order.getSoKhach())
                .isFirstBooking(orderPredict.getIsFirstBooking())
                .isArrival(isArrival)
                .build();
        System.out.println(" check orderTrainingEvent");
        orderTrainingEventRepository.save(orderTrainingEvent);
        System.out.println(" check after save orderTrainingEvent");
        orderTrainingProducerService.sendBookingRequestEvent(orderTrainingEvent);
    }

    @Override
    public PaymentResponse createPayment(Long paymentAmount,
            String maSoThanhToan, Long maSoDatBan) {
        OrderTable orderTable = orderTableRepository.findById(maSoDatBan)
                .orElseThrow(() -> new NotFoundException("Order table not found"));
        Payment payment = Payment.builder()
                .MaSoThanhToan(maSoThanhToan)
                .SoTienThanhToan(paymentAmount)
                .IsDeposit(false)
                .orderTable(orderTable)
                .PaymentStatus(PaymentStatus.NONE)
                .build();
        paymentRepository.save(payment);
        return PaymentResponse.builder().IsDeposit(payment.getIsDeposit())
                .MaSoThanhToan(payment.getMaSoThanhToan()).PaymentStatus(payment.getPaymentStatus())
                .SoTienThanhToan(paymentAmount).build();
    }

    @Override
    public ObjectNode refundByOwner(Long orderId) {
        OrderTable orderTable = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order table not found"));
        Payment payment = paymentRepository.findByOrderTable(orderId);
        if (payment == null)
            throw new NotFoundException("Payment not found");
        if (payment.getPaymentStatus() != PaymentStatus.PAID)
            throw new IllegalArgumentException("Payment status is not PAID");

        long paymentAmount = payment.getSoTienThanhToan();

        Deposit deposit = depositRepository.findDepositByRestaurantId(orderTable.getNhaHang().getMaSoNhaHang());
        if (deposit == null)
            throw new IllegalArgumentException("Policy is not available");

        LocalDateTime dateTime = orderTable.getNgay().atTime(orderTable.getGio());
        Byte hourLeft = (byte) Duration.between(LocalDateTime.now(), dateTime).toHours();

        int refund = 0;
        if (hourLeft >= deposit.getKhoangThoiGianHoanCocToanBo()) {
            refund = (int) Math.round(paymentAmount);
        } else if (hourLeft < deposit.getKhoangThoiGianHoanCocToanBo()
                || hourLeft > deposit.getKhoangThoiGianHoanCocToanBo()) {
            refund = (int) Math.round(paymentAmount * 0.5);
        } else {
            // Không hoàn tiền
            return null;
        }

        String returnUrl = String.format(urlClient + "/refund-status/%s", orderId);
        return paymentService.createPaymentLink(refund, null, returnUrl, true, orderTable);
    }

    @Transactional
    public void markAsConfirmed(Long orderId, String statusOrder) {
        OrderTable orderTable = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order table not found"));
        if (statusOrder.equals("CANCELLED_REFUNDED")) {
            orderTable.setTrangThai(OrderTableStatus.CANCELLED_REFUNDED);
            orderTable.setIsArrival(false);
            emailService.sendRefundEmail(orderTable);

        } else {
            orderTable.setTrangThai(OrderTableStatus.COMFIRMED_GOING_TO);
            reducePercentNoShow(orderTable);
        }
        orderTable.setEmailConfirmByUser(true);
        orderTableRepository.save(orderTable);
    }

    public Boolean isConfirmed(Long bookingId) {
        OrderTable orderTable = orderTableRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Order table not found"));
        return orderTable.getEmailConfirmByUser();
    }

    @Transactional
    public void updateStatusRefund(Boolean status, Long totalRefund, Long orderId) {
        OrderTable orderTable = orderTableRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order table not found"));
        orderTable.setStatusDepositRefund(status);
        orderTable.setTotalRefund(totalRefund);
        orderTableRepository.save(orderTable);
    }

    public void reducePercentNoShow(OrderTable orderTable) {
        Long arrival = orderTableRepository.countByStatusOrderAndIsArrival(OrderTableStatus.COMFIRMED_GOING_TO, true);
        Long notArrival = orderTableRepository.countByStatusOrderAndIsArrival(OrderTableStatus.COMFIRMED_GOING_TO,
                false);
        double total = arrival + notArrival;
        double alpha = total == 0 ? 0.0 : (double) arrival / total;
        alpha = Math.max(alpha, DEFAULT_ALPHA);
        orderTable.setPercentNoShow(alpha * orderTable.getPercentNoShow());
    }

    @Override
    public List<OverbookingRateRequest> getOverbookingRatesByDate(Long restaurantId, LocalDate date) {
        List<OverbookingRateRequest> result = new ArrayList<>();

        // Định nghĩa các khung giờ (ví dụ: 1 giờ một khung)
        LocalTime[] timeSlots = {
                LocalTime.of(8, 0), LocalTime.of(9, 0), LocalTime.of(10, 0),
                LocalTime.of(11, 0), LocalTime.of(12, 0), LocalTime.of(13, 0),
                LocalTime.of(14, 0), LocalTime.of(15, 0), LocalTime.of(16, 0),
                LocalTime.of(17, 0), LocalTime.of(18, 0), LocalTime.of(19, 0),
                LocalTime.of(20, 0), LocalTime.of(21, 0), LocalTime.of(22, 0)
        };

        for (int i = 0; i < timeSlots.length - 1; i++) {
            LocalTime startTime = timeSlots[i];
            LocalTime endTime = timeSlots[i + 1];

            List<OverbookingRateRequest> dto = calculateWeeklyOverbookingRates(
                    restaurantId, startTime, endTime);

            result = dto;
        }

        return result;
    }

    @Override
    public List<OverbookingRateRequest> getOverbookingRateByTimeSlot(Long restaurantId,
            LocalTime startTime, LocalTime endTime) {
        return calculateWeeklyOverbookingRates(restaurantId, startTime, endTime);
    }

    private List<OverbookingRateRequest> calculateWeeklyOverbookingRates(Long restaurantId,
            LocalTime startTime,
            LocalTime endTime) {
        List<OverbookingRateRequest> weeklyRates = new ArrayList<>();

        for (int dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
            Long totalBookings = orderTableRepository.countOrdersByWeekdayAndTimeSlot(
                    restaurantId, dayOfWeek, startTime, endTime);

            Long canceledOrNoShowBookings = orderTableRepository.countCanceledOrNoShowOrdersByWeekdayAndTimeSlot(
                    restaurantId, dayOfWeek, startTime, endTime);

            Double overbookingRate = 0.0;
            if (totalBookings > 0) {
                overbookingRate = (canceledOrNoShowBookings.doubleValue() / totalBookings.doubleValue()) * 100;
            }

            OverbookingRateRequest rateRequest = OverbookingRateRequest.builder()
                    .startTime(startTime)
                    .endTime(endTime)
                    .totalBookings(totalBookings)
                    .dayOfWeek(dayOfWeek) // 1 = Chủ nhật, 2 = Thứ hai, 3 = Thứ ba, v.v.
                    .canceledOrNoShowBookings(canceledOrNoShowBookings)
                    .overbookingRate(overbookingRate)
                    .build();

            weeklyRates.add(rateRequest);
        }

        return weeklyRates;
    }

    // public int getTotalBookings(Long customerID) {
    //
    // }
    // public OrderEvent toRequestEvent(OrderTable order) {
    // User user =
    // userRepository.findById(order.getKhachHang().getMaSoNguoiDung()).orElseThrow();
    //
    // double total =
    // paymentRepository.getTotalPaidPayment(user.getMaSoNguoiDung());
    // double canceled = bookingHistoryService.getCanceledBookings(user.getId());
    //
    // return new BookingRequestEvent(
    // order.getId().toString(),
    // user.getId().toString(),
    // order.getBookingTime().toString(),
    // order.getReservationTime().toString(),
    // order.getNumGuests(),
    // total == 0,
    // order.getBookingTime().getDayOfWeek().getValue(),
    // total > 0 ? canceled / total : 0.0,
    // order.getPaymentMethod(),
    // locationService.calculateDistanceKm(user.getAddress(),
    // order.getRestaurant().getAddress())
    // );
    // }

}