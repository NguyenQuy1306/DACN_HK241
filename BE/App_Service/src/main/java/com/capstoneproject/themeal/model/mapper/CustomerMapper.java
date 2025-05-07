package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.repository.CustomerRepository;

@Mapper
public interface CustomerMapper {
    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    @Mapping(source = "maSoNguoiDung", target = "maSoKhachHang")
    @Mapping(source = "hoTen", target = "hoTen")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "SDT", target = "SDT")
    @Mapping(source = "gioiTinh", target = "gioiTinh")
    @Mapping(source = "ngaySinh", target = "ngaySinh")
    @Mapping(source = "diaChi", target = "diaChi")
    CustomerResponse toCustomerResponse(Customer customer);
}
