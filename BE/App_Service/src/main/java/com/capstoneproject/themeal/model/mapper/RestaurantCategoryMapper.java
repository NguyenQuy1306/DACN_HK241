package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.RestaurantCategory;
import com.capstoneproject.themeal.model.response.RestaurantCategoryResponse;

@Mapper
public interface RestaurantCategoryMapper {

    RestaurantCategoryMapper INSTANCE = Mappers.getMapper(RestaurantCategoryMapper.class);

    RestaurantCategory toRestaurantCategory(RestaurantCategoryResponse restaurantCategoryResponse);

    RestaurantCategoryResponse toRestaurantCategoryResponse(RestaurantCategory restaurantCategory);
}
