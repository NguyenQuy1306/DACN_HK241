package com.curcus.lms.model.mapper;


import com.curcus.lms.model.entity.FavoriteList;
import com.curcus.lms.model.entity.FavoriteListRestaurant;
import com.curcus.lms.model.response.FavoriteListResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface FavoriteListMapper {
    FavoriteListMapper INSTANCE = Mappers.getMapper(FavoriteListMapper.class);

    @Mapping(source = "favoriteListRestaurants", target = "soLuongNhaHang", qualifiedByName = "mapFavoriteListRestaurant")
    FavoriteListResponse toFavoriteListResponse(FavoriteList favoriteList);

    @Named("mapFavoriteListRestaurant")
    default Long mapFavoriteListRestaurant(Set<FavoriteListRestaurant> favoriteListRestaurants) {
        return favoriteListRestaurants.stream().count();
    }


    FavoriteList toFavoriteList(FavoriteListResponse favoriteListResponse);
}
