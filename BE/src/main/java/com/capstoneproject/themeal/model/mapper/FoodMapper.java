package com.capstoneproject.themeal.model.mapper;

import com.capstoneproject.themeal.model.entity.FoodImage;
import com.capstoneproject.themeal.repository.FoodImageRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.response.CategoryResponse;
import com.capstoneproject.themeal.model.response.FoodFinalReponse;
import com.capstoneproject.themeal.model.response.FoodResponse;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class FoodMapper {



    // Map Food to FoodResponse without danhMuc field
    @Mapping(source = "maSoMonAn", target = "maSoMonAn")
    @Mapping(source = "ten", target = "ten")
    @Mapping(source = "gia", target = "gia")
    @Mapping(source = "moTa", target = "moTa")
    @Mapping(source = "maSoMonAnGoc", target = "maSoMonAnGoc")
    @Mapping(source = "trangThai", target = "trangThai")
    public abstract FoodResponse toFoodResponse(Food food);



    @Named("mapCategory")
    public CategoryResponse toCategoryResponse(Category category) {
        if (category == null) {
            return null;
        }
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setMaSoDanhMuc(category.getMaSoDanhMuc());
        categoryResponse.setTen(category.getTen());
        return categoryResponse;
    }

    public List<FoodFinalReponse> toFoodFinalResponse(List<Food> foods) {
        // Group FoodResponse items by CategoryResponse
        Map<Category, List<FoodResponse>> groupedByCategory = foods.stream()
                .collect(Collectors.groupingBy(Food::getDanhMuc,
                        Collectors.mapping(food -> toFoodResponse(food), Collectors.toList())));

        // Convert Map entries to FoodFinalReponse
        return groupedByCategory.entrySet().stream()
                .map(entry -> {
                    FoodFinalReponse response = new FoodFinalReponse();
                    response.setCategoryResponse(toCategoryResponse(entry.getKey()));
                    response.setFoodResponses(entry.getValue());
                    return response;
                })
                .collect(Collectors.toList());
    }
}
