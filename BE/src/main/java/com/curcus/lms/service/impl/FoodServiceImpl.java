package com.curcus.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.model.entity.*;
import com.curcus.lms.model.mapper.FoodMapper;
import com.curcus.lms.model.mapper.RestaurantMapper;
import com.curcus.lms.repository.*;
import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.service.FoodService;
import com.curcus.lms.service.RestaurantService;
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
            return foodMapper.toFoodFinalResponse(food);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

}
