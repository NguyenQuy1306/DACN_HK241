package com.curcus.lms.service.impl;

import com.curcus.lms.model.entity.OrderTable;
import com.curcus.lms.model.mapper.OrderTableMapper;
import com.curcus.lms.model.response.OrderTableResponse;
import com.curcus.lms.repository.OrderTableRepository;
import com.curcus.lms.service.OrderTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderTableServiceImpl implements OrderTableService {
    @Autowired
    OrderTableRepository orderTableRepository;

    @Override
    public List<OrderTableResponse> getOrderTableByCustomerId(Long customerId) {
        List<OrderTable> orderTables = orderTableRepository.findByMaSoKhachHang(customerId);
        return orderTables.stream().map(OrderTableMapper.INSTANCE::toOrderTableResponse).collect(Collectors.toList());
    }
}
