package com.curcus.lms.controller;


import com.curcus.lms.model.response.CustomerResponse;
import com.curcus.lms.service.impl.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
