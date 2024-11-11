package com.curcus.lms.model.mapper;
import com.curcus.lms.model.entity.OrderTable;
import com.curcus.lms.model.entity.RestaurantImage;
import com.curcus.lms.model.entity.RestaurantImageType;
import com.curcus.lms.model.response.OrderTableResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper
public interface OrderTableMapper {
    OrderTableMapper INSTANCE = Mappers.getMapper(OrderTableMapper.class);

    @Mapping(source = "khachHang.maSoNguoiDung", target = "maSoKhachHang")
    @Mapping(source = "nhaHang.ten", target = "tenNhaHang")
    @Mapping(source = "nhaHang.diaChi", target = "diaChiNhaHang")
    @Mapping(source = "nhaHang.maSoNhaHang", target = "maSoNhaHang")
    @Mapping(source = "phuongThucThanhToan.ten", target = "tenPhuongThucThanhToan")
    @Mapping(source = "nhaHang.danhSachAnhNhaHang", target = "anhNhaHang", qualifiedByName = "getImageUrl")
    OrderTableResponse toOrderTableResponse(OrderTable orderTable);

    @Named("getImageUrl")
    default String getImageUrlOfRestaurant(Set<RestaurantImage> restaurantImages) {
        if (restaurantImages == null) {
            return "";
        }
        return restaurantImages.stream().filter(image -> RestaurantImageType.RESTAURANTIMAGE.equals(image.getKieuAnh())).map(RestaurantImage::getURL).findFirst().orElse("");
    }

    OrderTable toOrderTable(OrderTableResponse orderTableResponse);
}
