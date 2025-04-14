package com.capstoneproject.themeal.model.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Setter
@Getter
public class RateResponse {
    private Long MaSoDanhGia;
    private String NoiDung;
    private String AnhNhaHang;
    private Double Sao;
    private LocalDateTime ThoiGianCapNhat;
    private Long MaSoNhaHang;
    private String TenNhaHang;
    private String DiaChi;

    public Long getMaSoDanhGia() {
        return MaSoDanhGia;
    }

    public void setMaSoDanhGia(Long maSoDanhGia) {
        MaSoDanhGia = maSoDanhGia;
    }

    public String getNoiDung() {
        return NoiDung;
    }

    public void setNoiDung(String noiDung) {
        NoiDung = noiDung;
    }

    public String getAnhNhaHang() {
        return AnhNhaHang;
    }

    public void setAnhNhaHang(String anhNhaHang) {
        AnhNhaHang = anhNhaHang;
    }

    public Double getSao() {
        return Sao;
    }

    public void setSao(Double sao) {
        Sao = sao;
    }

    public LocalDateTime getThoiGianCapNhat() {
        return ThoiGianCapNhat;
    }

    public void setThoiGianCapNhat(LocalDateTime thoiGianCapNhat) {
        ThoiGianCapNhat = thoiGianCapNhat;
    }

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

    public LocalDateTime getThoiGianTraiNghiem() {
        return ThoiGianTraiNghiem;
    }

    public void setThoiGianTraiNghiem(LocalDateTime thoiGianTraiNghiem) {
        ThoiGianTraiNghiem = thoiGianTraiNghiem;
    }

    private LocalDateTime ThoiGianTraiNghiem;
}
