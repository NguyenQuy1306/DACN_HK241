package com.curcus.lms.model.request;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRestaurantRequest implements Serializable {
    private String HoTenDem;
    private String Ten;
    private String SDT;
    private String Email;
    private String TenNhaHang;
    private String DiaChi;
    private String KhoangGia;
}
