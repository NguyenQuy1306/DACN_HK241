package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.FavoriteListRestaurant;
import com.curcus.lms.model.entity.RestaurantImage;
import com.curcus.lms.model.entity.RestaurantImageType;
import com.curcus.lms.model.response.FavoriteListRestaurantResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

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
        return restaurantImages.stream().filter(image -> RestaurantImageType.RESTAURANTIMAGE.equals(image.getKieuAnh())).map(RestaurantImage::getURL).findFirst().orElse("");
    }
}
