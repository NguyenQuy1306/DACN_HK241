package com.capstoneproject.themeal.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface RestaurantService {
    // List<RestaurantResponse> getRestaurants();

    Page<RestaurantInMapsResponse> getRestaurantsInMaps(Double blLat, Double blLng, Double trLat, Double trLng,
            Pageable pageable);

    List<RestaurantInMapsResponse> getRecommendedList();

}
