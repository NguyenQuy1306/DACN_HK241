package com.capstoneproject.themeal.service;

import java.util.Set;

import com.capstoneproject.themeal.model.response.RateResponse;

public interface RateService {
    Set<RateResponse> findByCustomerId(Long customerId);
}
