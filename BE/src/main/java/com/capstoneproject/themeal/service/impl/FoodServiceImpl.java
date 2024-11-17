package com.capstoneproject.themeal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.mapper.FoodMapper;
import com.capstoneproject.themeal.model.mapper.RestaurantMapper;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.RestaurantService;

import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private FoodMapper foodMapper;

    @Override
    public List<FoodFinalReponse> getAllFood(Pageable pageable, Long restaurantId) {
        try {
            List<Food> food = foodRepository.findAllFood(restaurantId, pageable);
            System.out.println("food length:::" + food.size());
            return foodMapper.toFoodFinalResponse(food);

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
        System.out.println("ngueyhsjdfnlkjsdkjlfhsdjlfhn");
        return true;
    }
}
