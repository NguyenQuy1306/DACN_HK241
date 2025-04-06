package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.FoodImage;
import com.capstoneproject.themeal.model.request.FoodImageRequest;
import com.capstoneproject.themeal.model.response.FoodImageResponse;

import java.util.List;

public interface FoodImageService {
    List<FoodImageResponse> getImageByRestaurantAndFoodId(List<FoodImageRequest> foodImageRequests);
    void deleteImageByRestaurantAndFoodId(Long restaurantId, Long foodId, String url);
}
