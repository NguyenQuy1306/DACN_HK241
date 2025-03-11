package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.response.CategoryResponse;

public interface CategoryService {

    public List<CategoryResponse> getAllCategoryByRestaurantId(Long restaurantId);

}
