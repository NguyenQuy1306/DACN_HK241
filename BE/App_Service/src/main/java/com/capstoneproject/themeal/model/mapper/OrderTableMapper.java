package com.capstoneproject.themeal.model.mapper;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.response.FinalOrderTableResponse;
import com.capstoneproject.themeal.model.response.OrderTableHasFoodResponse;
import com.capstoneproject.themeal.repository.CustomerRepository;
import com.capstoneproject.themeal.repository.FoodRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.response.OrderTableResponse;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderTableMapper {
    OrderTableMapper INSTANCE = Mappers.getMapper(OrderTableMapper.class);


    @Mapping(source = "khachHang.maSoNguoiDung", target = "maSoKhachHang")
    @Mapping(source = "nhaHang.ten", target = "tenNhaHang")
    @Mapping(source = "nhaHang.diaChi", target = "diaChiNhaHang")
    @Mapping(source = "nhaHang.maSoNhaHang", target = "maSoNhaHang")
    @Mapping(source = "phuongThucThanhToan.ten", target = "tenPhuongThucThanhToan")
    @Mapping(source = "tongTienThanhToan", target = "tongTienThanhToan")
    @Mapping(source = "tienDatCoc", target = "tienDatCoc")
    @Mapping(source = "nhaHang.kinhDo", target = "kinhDo")
    @Mapping(source = "nhaHang.viDo", target = "viDo")
    @Mapping(source = "orderAt", target = "thoiGianDat")
    @Mapping(source = "nhaHang.danhSachAnhNhaHang", target = "anhNhaHang", qualifiedByName = "getImageUrl")
    OrderTableResponse toOrderTableResponse(OrderTable orderTable);

    @Named("getImageUrl")
    default String getImageUrlOfRestaurant(Set<RestaurantImage> restaurantImages) {
        if (restaurantImages == null) {
            return "";
        }
        return restaurantImages.stream().filter(image -> RestaurantImageType.RESTAURANTIMAGE.equals(image.getKieuAnh()))
                .map(RestaurantImage::getURL).findFirst().orElse("");
    }

    OrderTable toOrderTable(OrderTableResponse orderTableResponse);


    @Mapping(source = "maSoDatBan", target = "maSoDatBan")
    @Mapping(source = "soKhach", target = "soKhach")
    @Mapping(source = "ngay", target = "ngay")
    @Mapping(source = "gio", target = "gio")
    @Mapping(source = "tienDatCoc", target = "tienCoc")
    @Mapping(source = "trangThai", target = "trangThai")
    @Mapping(source = "khachHang.hoTen", target = "tenKhachHang")
    @Mapping(source = "danhSachDonDatBanCoComboCoSan", target = "danhSachCombo")
    @Mapping(source = "danhSachDonDatBanCoMonAn", target = "danhSachMonAn", qualifiedByName = "addFoodInfo")
    @Mapping(source = "orderAt", target = "thoiGianTao")
    @Mapping(source = "tongTienThanhToan", target = "tongTienThanhToan")
    @Mapping(source = "percentNoShow", target = "tyLeHuy")
    FinalOrderTableResponse toFinalOrderTableResponse(OrderTable orderTable, @Context FoodRepository foodRepository);

    @Named("addFoodInfo")
    default Set<OrderTableHasFoodResponse> addFoodName(Set<OrderTableHasFood> orderTableHasFoods, @Context FoodRepository foodRepository) {
        return orderTableHasFoods.stream().map(food -> {
            OrderTableHasFoodResponse orderTableHasFoodResponse = new OrderTableHasFoodResponse();
            orderTableHasFoodResponse.setSoLuong(food.getSoLuong());
            orderTableHasFoodResponse.setMaSo(food.getMaSo());
            orderTableHasFoodResponse.setGia(foodRepository.findById(food.getMaSo().getMaSoMonAn()).get().getGia());
            orderTableHasFoodResponse.setTenMon(foodRepository.findById(food.getMaSo().getMaSoMonAn()).get().getTen());
            return orderTableHasFoodResponse;
        }).collect(Collectors.toSet());
    }


}
