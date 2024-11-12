package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.mapper.CustomerMapper;
import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.repository.CustomerRepository;
import com.capstoneproject.themeal.service.CustomerService;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Override
    public Optional<CustomerResponse> getCustomerById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            System.out.println(customer);
            System.out.println(customer.map(CustomerMapper.INSTANCE::toCustomerResponse));
        }

        return customer.map(CustomerMapper.INSTANCE::toCustomerResponse);
    }
}
