package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.RestaurantCategory;
import com.curcus.lms.model.response.RestaurantCategoryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RestaurantCategoryMapper {

    RestaurantCategoryMapper INSTANCE = Mappers.getMapper(RestaurantCategoryMapper.class);

    RestaurantCategory toRestaurantCategory(RestaurantCategoryResponse restaurantCategoryResponse);
    RestaurantCategoryResponse toRestaurantCategoryResponse(RestaurantCategory restaurantCategory);
}
