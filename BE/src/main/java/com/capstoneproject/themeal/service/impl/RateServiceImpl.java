package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.mapper.RateMapper;
import com.capstoneproject.themeal.model.response.RateResponse;
import com.capstoneproject.themeal.repository.RateRepository;
import com.capstoneproject.themeal.service.RateService;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RateServiceImpl implements RateService {
    @Autowired
    RateRepository rateRepository;

    @Override
    public Set<RateResponse> findByCustomerId(Long customerId) {
        return rateRepository.findByCustomerId(customerId).stream().map(RateMapper.INSTANCE::toRateResponse)
                .collect(Collectors.toSet());
    }
}
