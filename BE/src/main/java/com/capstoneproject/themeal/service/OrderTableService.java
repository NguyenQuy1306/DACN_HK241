package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.PaymentMethod;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.response.ComboAvailableHasFoodResponse;
import com.capstoneproject.themeal.model.response.OrderTableResponse;

public interface OrderTableService {
    List<OrderTableResponse> getOrderTableByCustomerId(Long customerId);

    public OrderTable saveOrderTable(User user, PaymentMethod paymentMethod, Restaurant restaurant, Short tableId);

    public void saveOrderTableHasComboAvailable(Long comboId, OrderTable orderTable);

    public void saveOrderTableHasFood(OrderTable orderTable, FoodOrderRequest foodOrderRequests);

    public OrderTableResponse mapping(OrderTable orderTable);

    // public ComboAvailableHasFoodResponse createCombo(Long maSoNhaHang,
    // ComboRequest comboRequest);

}
