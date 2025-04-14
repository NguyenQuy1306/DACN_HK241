package com.capstoneproject.themeal.service;

import java.util.Set;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.response.RateResponse;
import com.capstoneproject.themeal.model.response.RatesRestaurantResponse;
import com.capstoneproject.themeal.model.response.UserRateResponse;

import java.util.List;

public interface RateService {
    Set<RateResponse> findByCustomerId(Long customerId);

    public List<RatesRestaurantResponse> getRatesInRestaurant(Long restaurantId);

    public UserRateResponse findUserRateResponse(Rate rate, List<UserRateResponse> userRateResponses);

}
