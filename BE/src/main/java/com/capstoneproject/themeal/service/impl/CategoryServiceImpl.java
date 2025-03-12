package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.mapper.FoodMapper;
import com.capstoneproject.themeal.model.response.CategoryResponse;
import com.capstoneproject.themeal.repository.CategoryRepository;
import com.capstoneproject.themeal.service.CategoryService;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private FoodMapper foodMapper;

    @Override
    public List<CategoryResponse> getAllCategoryByRestaurantId(Long restaurantId) {
        try {
            return categoryRepository.getCategories(restaurantId).stream().map(q -> foodMapper.toCategoryResponse(q))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching categories", e); // Ném lỗi để Controller xử lý
        }
    }

    @Override
    public void checkCategoryExist(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Food ID not found: " + categoryId));

    }

}
