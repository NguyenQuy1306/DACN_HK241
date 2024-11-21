package com.capstoneproject.themeal.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface FoodService {
    // List<RestaurantResponse> getRestaurants();

    List<FoodFinalReponse> getAllFood(Pageable pageable, Long restaurantId);

    public boolean checkFoodExist(List<Long> listIdFood);
}
