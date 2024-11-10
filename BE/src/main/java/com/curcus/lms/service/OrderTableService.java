package com.curcus.lms.service;

import com.curcus.lms.model.entity.OrderTable;
import com.curcus.lms.model.response.OrderTableResponse;

import java.util.List;

public interface OrderTableService {
    List<OrderTableResponse> getOrderTableByCustomerId(Long customerId);
}
