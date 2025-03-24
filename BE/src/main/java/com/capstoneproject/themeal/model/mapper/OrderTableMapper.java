package com.capstoneproject.themeal.model.mapper;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.response.FinalOrderTableResponse;
import com.capstoneproject.themeal.repository.CustomerRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;
import com.capstoneproject.themeal.model.response.OrderTableResponse;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Mapper(componentModel = "spring")
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
    @Mapping(source = "danhSachDonDatBanCoMonAn", target = "danhSachMonAn")
    FinalOrderTableResponse toFinalOrderTableResponse(OrderTable orderTable, @Context CustomerRepository customerRepository);

//    @Named("IdToName")
//    default String covertIdToName(Customer customer, @Context CustomerRepository customerRepository) {
//        Optional<Customer> currentCustomer = customerRepository.findById(customer.getMaSoNguoiDung());
//        if (currentCustomer.isEmpty()) {
//            throw new NotFoundException("Customer not found");
//        } else {
//            return currentCustomer.get().getHoTen();
//        }
//    }


}
