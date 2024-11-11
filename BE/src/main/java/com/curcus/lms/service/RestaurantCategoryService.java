package com.curcus.lms.service;

import com.curcus.lms.model.response.RestaurantCategoryResponse;

import java.util.List;

public interface RestaurantCategoryService {
    List<RestaurantCategoryResponse> getAll();
}
