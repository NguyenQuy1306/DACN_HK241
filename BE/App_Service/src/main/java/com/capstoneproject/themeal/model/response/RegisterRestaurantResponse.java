package com.capstoneproject.themeal.model.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RegisterRestaurantResponse {
    private String HoTenDem;
    private String Ten;
    private String SDT;
    private String Email;
    private String TenNhaHang;
    private String DiaChi;
    private String KhoangGia;
}
