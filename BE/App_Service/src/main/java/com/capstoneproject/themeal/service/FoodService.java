package com.capstoneproject.themeal.service;

import java.util.List;
import java.util.Optional;

import com.capstoneproject.themeal.repository.FoodImageRepository;
import org.mapstruct.Context;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface FoodService {
    // List<RestaurantResponse> getRestaurants();

    List<FoodFinalReponse> getAllFood(Pageable pageable, Long restaurantId);

    List<FoodFinalReponse> getFoodByCategoryId(Pageable pageable, Long restaurantId, Long categoryId);

    FoodResponse getFoodById(Pageable pageable, Long restaurantId, Long foodId);

    public Food createNewFood(FoodRequest foodRequest, Long restaurantId, Long categoryId);

    Optional<Food> isFoodExist(Long foodId);

    public boolean checkFoodExist(List<Long> listIdFood);

    public List<FoodFinalReponse> deleteFood(Long restaurantId, Long foodId, Pageable pageable);

    public List<FoodFinalReponse> duplicateFood(Long restaurantId, Long foodId, Pageable pageable);

    public List<FoodFinalReponse> searchFood(String key, Long restaurantId, Pageable pageable);

    public void upLoadImageRestaurant(Long restaurantId, Long categoryId, Long foodId, MultipartFile file);

    public List<OrderTableHasFoodResponse> getFoodsByOrderId(Long orderId);
}
