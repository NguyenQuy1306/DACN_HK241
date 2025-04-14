package com.capstoneproject.themeal.model.mapper;

import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.request.CategoryRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
    @Mapping(source = "name", target = "Ten")
    @Mapping(source = "restaurantId", target = "NhaHang", qualifiedByName = "mapRestaurant")
    Category toCategory(CategoryRequest categoryRequest);

    @Named("mapRestaurant")
    default Restaurant mapRestaurant(Long restaurantId) {
        if (restaurantId == null) {
            return null;
        }
        Restaurant restaurant = new Restaurant();
        restaurant.setMaSoNhaHang(restaurantId);
        return restaurant;
    }
}
