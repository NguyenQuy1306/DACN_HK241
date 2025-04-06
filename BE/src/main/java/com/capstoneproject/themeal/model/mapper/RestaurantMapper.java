package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.response.RestaurantInMapsResponse;
import com.capstoneproject.themeal.service.S3Service;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class RestaurantMapper {
    @Autowired
    private S3Service s3Service;

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
    @Mapping(source = "ngayThamGia", target = "ngayThamGia")
    @Mapping(source = "trangThai", target = "trangThai")
    @Mapping(source = "thanhPho", target = "thanhPho")
    @Mapping(source = "chuNhaHang", target = "owner")
    @Mapping(source = "danhSachAnhNhaHang", target = "imageUrls", qualifiedByName = "mapImageUrls")
    public abstract RestaurantInMapsResponse toDetailResponse(Restaurant restaurant);

    private String extractKeyFromUrl(String fullUrl) {
        if (fullUrl.startsWith("http://") || fullUrl.startsWith("https://")) {
            return fullUrl;
        }
        return fullUrl;
    }

    @Named("mapImageUrls")
    protected Map<String, Set<String>> mapImageUrls(Set<RestaurantImage> danhSachAnhNhaHang) {
        return danhSachAnhNhaHang.stream()
                .collect(Collectors.groupingBy(
                        image -> image.getKieuAnh().toString(),
                        Collectors.mapping(image -> {
                            String keyOrUrl = extractKeyFromUrl(image.getURL());
                            return image.getURL().startsWith("http") ? keyOrUrl
                                    : s3Service.generatePresignedUrl("themealbucket1", keyOrUrl);
                        }, Collectors.toSet())));
    }

}
