package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.FavoriteListRestaurant;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;
import com.capstoneproject.themeal.model.response.FavoriteListRestaurantResponse;

import java.util.List;
import java.util.Set;

@Mapper
public interface FavoriteListRestaurantMapper {
    FavoriteListRestaurantMapper INSTANCE = Mappers.getMapper(FavoriteListRestaurantMapper.class);

    @Mapping(source = "nhaHang.maSoNhaHang", target = "maSoNhaHang")
    @Mapping(source = "nhaHang.ten", target = "tenNhaHang")
    @Mapping(source = "nhaHang.diaChi", target = "diaChi")
    @Mapping(source = "nhaHang.khoangGia", target = "khoangGia")
    @Mapping(source = "nhaHang.danhSachAnhNhaHang", target = "anhNhaHang", qualifiedByName = "getUrlOfRestaurantImage")
    FavoriteListRestaurantResponse toFavoriteListRestaurantResponse(FavoriteListRestaurant favoriteListRestaurant);

    @Named("getUrlOfRestaurantImage")
    default String getUrlOfRestaurantImage(Set<RestaurantImage> restaurantImages) {
        return restaurantImages.stream().filter(image -> RestaurantImageType.RESTAURANTIMAGE.equals(image.getKieuAnh()))
                .map(RestaurantImage::getURL).findFirst().orElse("");
    }
}
