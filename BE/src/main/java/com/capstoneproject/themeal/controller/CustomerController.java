package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.service.impl.CustomerServiceImpl;

import java.util.Optional;

@RestController
@RequestMapping("api/customer")
public class CustomerController {
    @Autowired
    CustomerServiceImpl customerService;

    @GetMapping("/{customerId}")
    public Optional<CustomerResponse> getCustomerById(@PathVariable Long customerId) {
        return customerService.getCustomerById(customerId);
    }
}
