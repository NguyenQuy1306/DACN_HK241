package com.curcus.lms.model.response;

import java.util.Date;

public class CustomerResponse {
    private Long maSoKhachHang;
    private String email;
    private String HoTen;
    private String SDT;
    private Date NgaySinh;
    private String GioiTinh;
    private String DiaChi;

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
    }

    public Long getMaSoKhachHang() {
        return maSoKhachHang;
    }

    public void setMaSoKhachHang(Long maSoKhachHang) {
        this.maSoKhachHang = maSoKhachHang;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        email = email;
    }

    public String getHoTen() {
        return HoTen;
    }

    public void setHoTen(String hoTen) {
        HoTen = hoTen;
    }

    public String getSDT() {
        return SDT;
    }

    public void setSDT(String SDT) {
        this.SDT = SDT;
    }

    public Date getNgaySinh() {
        return NgaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        NgaySinh = ngaySinh;
    }

    public String getGioiTinh() {
        return GioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        GioiTinh = gioiTinh;
    }
}
