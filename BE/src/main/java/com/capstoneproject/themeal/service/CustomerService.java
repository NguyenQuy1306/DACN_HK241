package com.capstoneproject.themeal.service;

import java.util.Optional;

import com.capstoneproject.themeal.model.response.CustomerResponse;

public interface CustomerService {
    Optional<CustomerResponse> getCustomerById(Long id);
}
