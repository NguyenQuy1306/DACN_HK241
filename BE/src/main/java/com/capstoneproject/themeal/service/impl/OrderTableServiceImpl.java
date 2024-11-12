package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.mapper.OrderTableMapper;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import com.capstoneproject.themeal.service.OrderTableService;

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
