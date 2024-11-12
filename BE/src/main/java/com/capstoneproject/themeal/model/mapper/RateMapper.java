package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;
import com.capstoneproject.themeal.model.response.RateResponse;

import java.util.Set;

@Mapper
public interface RateMapper {
    RateMapper INSTANCE = Mappers.getMapper(RateMapper.class);

    @Mapping(source = "maSoDanhGia", target = "maSoDanhGia")
    @Mapping(source = "noiDung", target = "noiDung")
    @Mapping(source = "sao", target = "sao")
    @Mapping(source = "thoiGianCapNhat", target = "thoiGianCapNhat")
    @Mapping(source = "thoiGianTraiNghiem", target = "thoiGianTraiNghiem")
    @Mapping(source = "nhaHang.ten", target = "tenNhaHang")
    @Mapping(source = "nhaHang.diaChi", target = "diaChi")
    @Mapping(source = "nhaHang.maSoNhaHang", target = "maSoNhaHang")
    @Mapping(source = "nhaHang.danhSachAnhNhaHang", target = "anhNhaHang", qualifiedByName = "getRestaurantImage")
    RateResponse toRateResponse(Rate rate);

    @Named("getRestaurantImage")
    default String getRestaurantImage(Set<RestaurantImage> restaurantImages) {
        return restaurantImages.stream().filter(image -> RestaurantImageType.RESTAURANTIMAGE.equals(image.getKieuAnh()))
                .map(RestaurantImage::getURL).findFirst().orElse("");
    }
}
