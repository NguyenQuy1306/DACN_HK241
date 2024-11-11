package com.curcus.lms.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.curcus.lms.model.entity.Category;
import com.curcus.lms.model.entity.Food;
import com.curcus.lms.model.response.CategoryResponse;
import com.curcus.lms.model.response.FoodFinalReponse;
import com.curcus.lms.model.response.FoodResponse;

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
                        Collectors.mapping(this::toFoodResponse, Collectors.toList())));

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
