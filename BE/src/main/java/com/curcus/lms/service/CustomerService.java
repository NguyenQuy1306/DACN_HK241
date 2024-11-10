package com.curcus.lms.service;

import com.curcus.lms.model.response.CustomerResponse;

import java.util.Optional;

public interface CustomerService {
    Optional<CustomerResponse> getCustomerById(Long id);
}
