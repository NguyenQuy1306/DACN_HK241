package com.capstoneproject.themeal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.mapper.RestaurantMapper;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.RestaurantService;
import org.springframework.data.domain.Page;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantMapper restaurantMapper;
    // @Override
    // public List<RestaurantResponse> getRestaurants() {
    // try {
    // List<Restaurant> restaurants = restaurantRepository.findAll();
    // return restaurants.stream()
    // .map(restaurantMapper::toDetailResponse)
    // .collect(Collectors.toList());
    // } catch (Exception ex) {
    // throw new ApplicationException();
    // }
    // }

    @Override
    public List<RestaurantInMapsResponse> getRecommendedList() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll();
            int numOfRes = Math.min(restaurants.size(), 10);
            List<Restaurant> recommendedList = new ArrayList<>();
            for (int i = 0; i < numOfRes; i++) {
                recommendedList.add(restaurants.get(i));
            }

            return recommendedList.stream().map(restaurantMapper::toDetailResponse).collect(Collectors.toList());

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public Page<RestaurantInMapsResponse> getRestaurantsInMaps(Double blLat, Double blLng, Double trLat, Double trLng,
            Pageable pageable) {

        try {
            Page<Restaurant> restaurants = restaurantRepository.findRestaurantsInBoundary(blLat, blLng, trLat, trLng,
                    RestaurantImageType.RESTAURANTIMAGE, pageable);

            return restaurants.map(restaurantMapper::toDetailResponse);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

}
