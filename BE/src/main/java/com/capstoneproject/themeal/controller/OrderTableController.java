package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.service.OrderTableService;
import com.capstoneproject.themeal.service.impl.OrderTableServiceImpl;

import java.util.List;

@RestController
@RequestMapping("api/order-table")
public class OrderTableController {
    @Autowired
    OrderTableServiceImpl orderTableServiceImpl;

    @GetMapping("/{customerId}")
    List<OrderTableResponse> getAllOrderByCustomerId(@PathVariable Long customerId) {
        return orderTableServiceImpl.getOrderTableByCustomerId(customerId);
    }
}
