package com.curcus.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.model.entity.*;
import com.curcus.lms.model.mapper.RestaurantMapper;
import com.curcus.lms.repository.*;
import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.model.response.RestaurantResponse;
import com.curcus.lms.service.RestaurantService;
import java.util.stream.Collectors;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantMapper restaurantMapper;

    @Override
    public List<RestaurantResponse> getRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll();
            return restaurants.stream()
                    .map(restaurantMapper::toDetailResponse)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }
}
