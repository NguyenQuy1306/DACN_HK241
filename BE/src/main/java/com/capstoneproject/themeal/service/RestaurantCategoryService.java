package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.response.RestaurantCategoryResponse;

public interface RestaurantCategoryService {
    List<RestaurantCategoryResponse> getAll();
}
