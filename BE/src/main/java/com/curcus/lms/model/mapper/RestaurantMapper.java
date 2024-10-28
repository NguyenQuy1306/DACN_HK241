package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.entity.RestaurantImage;
import com.curcus.lms.model.response.RestaurantInMapsResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class RestaurantMapper {

    @Mapping(source = "maSoNhaHang", target = "maSoNhaHang")
    @Mapping(source = "URL", target = "URL")
    @Mapping(source = "ten", target = "ten")
    @Mapping(source = "diaChi", target = "diaChi")
    @Mapping(source = "loaiHinh", target = "loaiHinh")
    @Mapping(source = "khoangGia", target = "khoangGia")
    @Mapping(source = "gioHoatDong", target = "gioHoatDong")
    @Mapping(source = "phuHop", target = "phuHop")
    @Mapping(source = "monDacSac", target = "monDacSac")
    @Mapping(source = "moTaKhongGian", target = "moTaKhongGian")
    @Mapping(source = "diemDacTrung", target = "diemDacTrung")
    @Mapping(source = "viDo", target = "viDo")
    @Mapping(source = "kinhDo", target = "kinhDo")
    public abstract RestaurantInMapsResponse toDetailResponse(Restaurant restaurant);

    // Phương thức mapping cho danhSachAnhNhaHang
    protected Set<String> mapDanhSachAnhNhaHang(Set<RestaurantImage> danhSachAnhNhaHang) {
        return danhSachAnhNhaHang.stream()
                .map(RestaurantImage::getURL) // Đảm bảo RestaurantImage có phương thức getURL()
                .collect(Collectors.toSet());
    }

}
