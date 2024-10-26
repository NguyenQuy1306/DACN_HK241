package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.response.*;
import com.curcus.lms.repository.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class RestaurantMapper {

    // @Mapping(source = "courseThumbnail", target = "courseThumbnail")
    // @Mapping(source = "title", target = "title")
    // @Mapping(source = "description", target = "description")
    // @Mapping(source = "price", target = "price")
    // @Mapping(source = "createdAt", target = "createdAt")
    // @Mapping(source = "avgRating", target = "avgRating")
    // @Mapping(source = "instructor", target = "instructor", qualifiedByName =
    // "toDetailResponse")
    // @Mapping(source = "category", target = "category")
    // @Mapping(target = "sections", expression = "java(mapSortedSections(course))")
    public abstract RestaurantResponse toDetailResponse(Restaurant restaurant);
}
