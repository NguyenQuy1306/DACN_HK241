package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.request.CategoryRequest;
import com.capstoneproject.themeal.model.response.CategoryResponse;

public interface CategoryService {

    public List<CategoryResponse> getAllCategoryByRestaurantId(Long restaurantId);

    public void checkCategoryExist(Long categoryId);

    List<CategoryResponse> addNewCategory(Long restaurantId);

    List<CategoryResponse> deleteCategory(Long restaurantId, Long categoryId);

    List<CategoryResponse> searchCategory(Long restaurantId, String keyword);

    List<CategoryResponse> updateCategory(Long categoryId, CategoryRequest categoryRequest);
}
