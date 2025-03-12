package com.capstoneproject.themeal.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface FoodService {
    // List<RestaurantResponse> getRestaurants();

    List<FoodFinalReponse> getAllFood(Pageable pageable, Long restaurantId);

    public Food createNewFood(FoodRequest foodRequest, Long restaurantId, Long categoryId);

    public boolean checkFoodExist(List<Long> listIdFood);

    public void upLoadImageRestaurant(Long restaurantId, Long categoryId, Long foodId, MultipartFile file);
}
