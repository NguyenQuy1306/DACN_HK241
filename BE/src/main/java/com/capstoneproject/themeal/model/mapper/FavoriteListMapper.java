package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.FavoriteList;
import com.capstoneproject.themeal.model.entity.FavoriteListRestaurant;
import com.capstoneproject.themeal.model.response.FavoriteListResponse;

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
