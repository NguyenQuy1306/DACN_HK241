package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.entity.FoodImage;
import com.capstoneproject.themeal.model.request.FoodImageRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.FoodImageResponse;
import com.capstoneproject.themeal.repository.FoodImageRepository;
import com.capstoneproject.themeal.service.FoodImageService;
import com.capstoneproject.themeal.service.S3Service;
import com.cloudinary.Api;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/foodImage")
public class FoodImageController {
    private final FoodImageRepository foodImageRepository;
    private final FoodImageService foodImageService;
    private final S3Service s3Service;

    public FoodImageController(FoodImageRepository foodImageRepository, FoodImageService foodImageService, S3Service s3Service) {
        this.foodImageRepository = foodImageRepository;
        this.foodImageService = foodImageService;
        this.s3Service = s3Service;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<List<FoodImageResponse>>> getFoodImage(@RequestBody List<FoodImageRequest> foodImageRequest) {
        ApiResponse<List<FoodImageResponse>> apiResponse = new ApiResponse<List<FoodImageResponse>>();
        List<FoodImageResponse> foodImageResponses = foodImageService.getImageByRestaurantAndFoodId(foodImageRequest);
        foodImageResponses.forEach(image ->image.getImageUrl().stream().map(image1->s3Service.generatePresignedUrl("themealbucket1",image1)));
        apiResponse.ok(foodImageResponses);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<ApiResponse<String>> deleteFoodImage(@RequestParam String url, @RequestParam Long restaurantId, @RequestParam Long foodId) {
        ApiResponse<String> apiResponse = new ApiResponse<String>();
        try {
            s3Service.deleteObject("themealbucket1",List.of(url),restaurantId);
            foodImageService.deleteImageByRestaurantAndFoodId(restaurantId,foodId,url);
            apiResponse.ok("Success");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


}
