package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;
import com.capstoneproject.themeal.model.response.RateResponse;
import com.capstoneproject.themeal.model.response.RatesRestaurantResponse;
import com.capstoneproject.themeal.model.response.UserRateResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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
        return restaurantImages.stream()
                .filter(image -> RestaurantImageType.RESTAURANTIMAGE.equals(image.getKieuAnh()))
                .map(RestaurantImage::getURL)
                .findFirst()
                .orElse("");
    }

    @Mapping(source = "rate.thoiGianCapNhat", target = "thoiGianCapNhat")
    @Mapping(source = "rate.noiDung", target = "noiDung")
    @Mapping(source = "rate.sao", target = "sao")
    @Mapping(source = "rate.danhSachAnhNhaHang", target = "userImages", qualifiedByName = "mapImageUrls")
    @Mapping(source = "userRateResponses", target = "userRateResponses")
    RatesRestaurantResponse toRateRestaurantRepsonse(Rate rate, UserRateResponse userRateResponses);

    @Named("mapImageUrls")
    default List<String> mapImageUrls(Set<RestaurantImage> danhSachAnhNhaHang) {
        return danhSachAnhNhaHang.stream()
                .map(RestaurantImage::getURL)
                .collect(Collectors.toList());
    }

}