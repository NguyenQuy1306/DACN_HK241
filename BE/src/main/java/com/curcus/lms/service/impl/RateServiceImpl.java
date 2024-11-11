package com.curcus.lms.service.impl;

import com.curcus.lms.model.mapper.RateMapper;
import com.curcus.lms.model.response.RateResponse;
import com.curcus.lms.repository.RateRepository;
import com.curcus.lms.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RateServiceImpl implements RateService {
    @Autowired
    RateRepository rateRepository;
    @Override
    public Set<RateResponse> findByCustomerId(Long customerId) {
        return rateRepository.findByCustomerId(customerId).stream().map(RateMapper.INSTANCE::toRateResponse).collect(Collectors.toSet());
    }
}
