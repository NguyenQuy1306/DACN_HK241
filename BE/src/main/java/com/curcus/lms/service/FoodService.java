package com.curcus.lms.service;

import java.util.List;

import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import org.springframework.data.domain.Pageable;

public interface FoodService {
    // List<RestaurantResponse> getRestaurants();

    List<FoodFinalReponse> getAllFood(Pageable pageable, Long restaurantId);

}
