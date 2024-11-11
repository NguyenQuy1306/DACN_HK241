package com.curcus.lms.model.response;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class FavoriteListRestaurantResponse {
    private Long MaSoNhaHang;
    private String TenNhaHang;
    private String DiaChi;
    private String KhoangGia;
    private String AnhNhaHang;

    public Long getMaSoNhaHang() {
        return MaSoNhaHang;
    }

    public void setMaSoNhaHang(Long maSoNhaHang) {
        MaSoNhaHang = maSoNhaHang;
    }

    public String getTenNhaHang() {
        return TenNhaHang;
    }

    public void setTenNhaHang(String tenNhaHang) {
        TenNhaHang = tenNhaHang;
    }

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
    }

    public String getKhoangGia() {
        return KhoangGia;
    }

    public void setKhoangGia(String khoangGia) {
        KhoangGia = khoangGia;
    }

    public String getAnhNhaHang() {
        return AnhNhaHang;
    }

    public void setAnhNhaHang(String anhNhaHang) {
        AnhNhaHang = anhNhaHang;
    }
}
