package com.capstoneproject.themeal.service.impl;

import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;
import com.capstoneproject.themeal.model.mapper.RateMapper;
import com.capstoneproject.themeal.model.response.RateResponse;
import com.capstoneproject.themeal.model.response.RatesRestaurantResponse;
import com.capstoneproject.themeal.model.response.UserRateResponse;
import com.capstoneproject.themeal.repository.RateRepository;
import com.capstoneproject.themeal.service.RateService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RateServiceImpl implements RateService {
    @Autowired
    private RateRepository rateRepository;

    @Override
    public Set<RateResponse> findByCustomerId(Long customerId) {
        return rateRepository.findByCustomerId(customerId).stream().map(RateMapper.INSTANCE::toRateResponse)
                .collect(Collectors.toSet());
    }

    @Override
    public UserRateResponse findUserRateResponse(Rate rate, List<UserRateResponse> userRateResponses) {
        return userRateResponses.stream()
                .filter(user -> user.getMaSoNguoiDung().equals(rate.getNguoiDung().getMaSoNguoiDung()))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<RatesRestaurantResponse> getRatesInRestaurant(Long restaurantId) {
        List<Rate> rates = rateRepository.getRatesByRestaurantId(restaurantId);
        List<UserRateResponse> userRateResponses = rateRepository.getUserRateById(restaurantId);

        return rates.stream()
                .map(rate -> {
                    UserRateResponse userRateResponse = this.findUserRateResponse(rate, userRateResponses);
                    return RateMapper.INSTANCE.toRateRestaurantRepsonse(rate, userRateResponse);
                })
                .collect(Collectors.toList());
    }
}
