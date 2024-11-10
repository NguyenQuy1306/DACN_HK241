package com.curcus.lms.service.impl;

import com.curcus.lms.model.entity.Customer;
import com.curcus.lms.model.mapper.CustomerMapper;
import com.curcus.lms.model.response.CustomerResponse;
import com.curcus.lms.repository.CustomerRepository;
import com.curcus.lms.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
