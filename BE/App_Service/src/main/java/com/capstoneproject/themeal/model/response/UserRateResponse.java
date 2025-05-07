package com.capstoneproject.themeal.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

@Data
@NoArgsConstructor
public class UserRateResponse implements Serializable {
    private Long MaSoNguoiDung;
    private String HoTen;
    private Long reviewCount;

    public UserRateResponse(Long maSoNguoiDung, String hoTen, Long rateCount) {
        this.MaSoNguoiDung = maSoNguoiDung;
        this.HoTen = hoTen;
        this.reviewCount = rateCount;
    }
}