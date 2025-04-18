package com.capstoneproject.themeal.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRestaurantRequest implements Serializable {
    @JsonProperty("HoTenDem")
    private String hoTenDem;
    @JsonProperty("Ten")
    private String ten;
    @JsonProperty("SDT")
    private String sdt;
    @JsonProperty("Email")
    private String email;
    @JsonProperty("TenNhaHang")
    private String tenNhaHang;
    @JsonProperty("DiaChi")
    private String diaChi;
    @JsonProperty("KhoangGia")
    private String khoangGia;
}
