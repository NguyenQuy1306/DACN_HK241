package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.response.OrderTableResponse;

public interface OrderTableService {
    List<OrderTableResponse> getOrderTableByCustomerId(Long customerId);
}
