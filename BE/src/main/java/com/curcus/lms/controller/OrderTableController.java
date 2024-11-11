package com.curcus.lms.controller;

import com.curcus.lms.model.entity.OrderTable;
import com.curcus.lms.model.response.OrderTableResponse;
import com.curcus.lms.service.OrderTableService;
import com.curcus.lms.service.impl.OrderTableServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order-table")
@CrossOrigin(origins = "*")
public class OrderTableController {
    @Autowired
    OrderTableServiceImpl orderTableServiceImpl;

    @GetMapping("/{customerId}")
    List<OrderTableResponse> getAllOrderByCustomerId(@PathVariable Long customerId) {
        return orderTableServiceImpl.getOrderTableByCustomerId(customerId);
    }
}
