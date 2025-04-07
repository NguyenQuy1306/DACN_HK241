package com.capstoneproject.themeal.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.mapstruct.Condition;
import org.mapstruct.Context;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import com.capstoneproject.themeal.config.S3Buckets;
import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.mapper.FoodMapper;
import com.capstoneproject.themeal.model.mapper.RestaurantMapper;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.CategoryService;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.RestaurantService;
import com.capstoneproject.themeal.service.S3Service;

import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private FoodMapper foodMapper;
    @Autowired
    private S3Service s3Service;
    @Autowired
    private S3Buckets s3Buckets;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private FoodImageRepository foodImageRepository;

    @Override
    public List<FoodFinalReponse> getAllFood(Pageable pageable, Long restaurantId) {
        try {
            List<Food> food = foodRepository.findAllFood(restaurantId, pageable);
            return foodMapper.toFoodFinalResponse(food);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public List<FoodFinalReponse> getFoodByCategoryId(Pageable pageable, Long restaurantId, Long categoryId) {
        try {
            List<Food> food = foodRepository.searchByCategoryId(categoryId, restaurantId, pageable);
            return foodMapper.toFoodFinalResponse(food);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public FoodResponse getFoodById(Pageable pageable, Long restaurantId, Long foodId) {
        try {
            List<FoodFinalReponse> foodOfRestaurant = getAllFood(pageable, restaurantId);
            return foodOfRestaurant.stream().flatMap(f -> f.getFoodResponses().stream())
                    .filter(f1 -> f1.getMaSoMonAn().equals(foodId)).findFirst().orElse(null);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public boolean checkFoodExist(List<Long> listIdFood) {
        List<Long> existingIds = foodRepository.findExistingFoodIds(listIdFood);

        // Find IDs that are missing
        List<Long> missingIds = listIdFood.stream()
                .filter(id -> !existingIds.contains(id))
                .toList();

        if (!missingIds.isEmpty()) {
            throw new IllegalArgumentException("Food IDs not found: " + missingIds);
        }
        return true;
    }

    @Override

    public Optional<Food> isFoodExist(Long foodId) {
        return foodRepository.findById(foodId);
    }

    @Override
    public List<FoodFinalReponse> deleteFood(Long restaurantId, Long foodId, Pageable pageable) {
        try {
            boolean isFoodExist = this.checkFoodExist(List.of(foodId));
            if (isFoodExist) {
                Food food = foodRepository.findById(foodId).get();
                food.setTrangThai("Inactive");
                foodRepository.save(food);
                List<Food> availableFoods = foodRepository.findAllFood(restaurantId, pageable);
                return foodMapper.toFoodFinalResponse(availableFoods.stream().filter(i->i.getTrangThai().equals("Active")).collect(Collectors.toList()));
            } else {
                throw new IllegalArgumentException("Food ID not found: " + foodId);
            }

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public List<FoodFinalReponse> duplicateFood(Long restaurantId, Long foodId, Pageable pageable) {
        try {
            boolean isFoodExist = this.checkFoodExist(List.of(foodId));
            if (isFoodExist) {
                Optional<Food> currentFood = foodRepository.findById(foodId);

                Food newFood = Food.builder().Gia(currentFood.get().getGia()).DanhMuc(currentFood.get().getDanhMuc())
                        .MoTa(currentFood.get().getMoTa())
                        .Ten(currentFood.get().getTen()).TrangThai("Active").build();
                foodRepository.save(newFood);

                List<Food> food = foodRepository.findAllFood(restaurantId, pageable);
                return foodMapper.toFoodFinalResponse(food);
            } else {
                throw new IllegalArgumentException("Food ID not found: " + foodId);
            }

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public List<FoodFinalReponse> searchFood(String key, Long restaurantId, Pageable pageable) {
        try {
            List<Food> food = foodRepository.searchByKeyWord(key, restaurantId, pageable);
            return foodMapper.toFoodFinalResponse(food);
        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    public void checkFoodExist(Long foodId) {
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new IllegalArgumentException("Food ID not found: " + foodId));

    }

    @Override
    public void upLoadImageRestaurant(Long restaurantId, Long categoryId, Long foodId, MultipartFile file) {
        try {
            // check food
            checkFoodExist(foodId);
            // check category
            categoryService.checkCategoryExist(categoryId);
            // Tên bucket chuẩn xác
            String bucketName = "themealbucket1";

            // Lấy loại file từ MultipartFile (vd: image/png, image/jpeg)
            String contentType = file.getContentType();
            String fileExtension = contentType != null && contentType.contains("png") ? ".png" : ".jpg";

            String timestamp = String.valueOf(System.currentTimeMillis());
            String fileName = foodId + "_" + timestamp + fileExtension;

            String s3Key = String.format("restaurants/%s/menu/%s/%s", restaurantId, categoryId, fileName);

            s3Service.putObject(bucketName, s3Key, file.getBytes());
            Food food = foodRepository.findById(foodId).orElse(null);
            FoodImage foodImage = FoodImage.builder().KieuAnh(RestaurantImageType.FOODIMAGE)
                    .NhaHang(restaurantRepository.findById(restaurantId).orElse(null)).URL(s3Key).food(food).build();
            foodImageRepository.save(foodImage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload food image: " + e.getMessage(), e);
        }
    }

    @Override
    public Food createNewFood(FoodRequest foodRequest, Long restaurantId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("category ID not found: " + categoryId));

        Food food = Food.builder().Gia(foodRequest.getGia()).DanhMuc(category).MoTa(foodRequest.getMoTa())
                .Ten(foodRequest.getTen()).TrangThai("Active").build();


        return foodRepository.save(food);
    }

}
