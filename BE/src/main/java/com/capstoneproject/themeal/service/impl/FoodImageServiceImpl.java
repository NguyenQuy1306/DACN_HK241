package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.FoodImage;
import com.capstoneproject.themeal.model.request.FoodImageRequest;
import com.capstoneproject.themeal.model.response.FoodImageResponse;
import com.capstoneproject.themeal.repository.FoodImageRepository;
import com.capstoneproject.themeal.service.FoodImageService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FoodImageServiceImpl implements FoodImageService {
    private final FoodImageRepository foodImageRepository;

    public FoodImageServiceImpl(FoodImageRepository foodImageRepository) {
        this.foodImageRepository = foodImageRepository;
    }

    @Override
    public List<FoodImageResponse> getImageByRestaurantAndFoodId(List<FoodImageRequest> foodImageRequests) {
        List<FoodImageResponse> foodImageResponses = new ArrayList<>();
        foodImageRequests.forEach(request -> {
            FoodImageResponse foodImageResponse = new FoodImageResponse();
            List<FoodImage> foodImages = foodImageRepository.findByRestaurantAndFoodId(request.getRestaurantId(), request.getFoodId());
            foodImageResponse.setImageUrl(foodImages.stream().map(FoodImage::getURL).toList());
            foodImageResponse.setRestaurantId(request.getRestaurantId());
            foodImageResponse.setFoodId(request.getFoodId());
            foodImageResponses.add(foodImageResponse);
        });
        return foodImageResponses;
    }

    @Override
    public void deleteImageByRestaurantAndFoodId(Long restaurantId, Long foodId, String url) {
        foodImageRepository.deleteFoodImage(restaurantId, foodId, url);
    }
}
