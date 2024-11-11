package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.Customer;
import com.curcus.lms.model.response.CustomerResponse;
import com.curcus.lms.repository.CustomerRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

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
