package com.curcus.lms.service;

import java.util.List;

import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import org.springframework.data.domain.Pageable;

public interface RestaurantService {
    // List<RestaurantResponse> getRestaurants();

    List<RestaurantInMapsResponse> getRestaurantsInMaps(Double blLat, Double blLng, Double trLat, Double trLng,
            Pageable pageable);

    List<RestaurantInMapsResponse> getRecommendedList();

}
