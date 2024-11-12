package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.response.RestaurantInMapsResponse;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class RestaurantMapper {

    // @Mapping(source = "MasoNhaHang", target = "MaSoNhaHang")
    // @Mapping(source = "url", target = "url")
    // @Mapping(source = "ten", target = "ten")
    // @Mapping(source = "diaChi", target = "diaChi")
    // @Mapping(source = "loaiHinh", target = "loaiHinh")
    // @Mapping(source = "khoangGia", target = "khoangGia")
    // @Mapping(source = "gioHoatDong", target = "gioHoatDong")
    // @Mapping(source = "phuHop", target = "phuHop")
    // @Mapping(source = "monDacSac", target = "monDacSac")
    // @Mapping(source = "moTaKhongGian", target = "moTaKhongGian")
    // @Mapping(source = "diemDacTrung", target = "diemDacTrung")
    // @Mapping(source = "viDo", target = "viDo")
    // @Mapping(source = "kinhDo", target = "kinhDo")
    @Mapping(source = "danhSachAnhNhaHang", target = "imageUrls", qualifiedByName = "mapImageUrls")
    public abstract RestaurantInMapsResponse toDetailResponse(Restaurant restaurant);

    // Phương thức để ánh xạ danh sách ảnh thành map dựa trên loại ảnh
    @Named("mapImageUrls")
    protected Map<String, Set<String>> mapImageUrls(Set<RestaurantImage> danhSachAnhNhaHang) {
        return danhSachAnhNhaHang.stream()
                .collect(Collectors.groupingBy(
                        image -> image.getKieuAnh().toString(), // Chuyển đổi sang String để phù hợp với Map<String,
                                                                // Set<String>>
                        Collectors.mapping(RestaurantImage::getURL, // Dùng URL làm value
                                Collectors.toSet()) // Gom thành Set URL
                ));
    }
}
