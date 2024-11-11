package com.curcus.lms.service;

import com.curcus.lms.model.response.RateResponse;

import java.util.Set;

public interface RateService {
    Set<RateResponse> findByCustomerId(Long customerId);
}
