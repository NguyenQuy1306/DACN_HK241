package com.capstoneproject.themeal.model.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.query.Order;

import com.capstoneproject.themeal.model.entity.PaymentMethod;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.User;

import java.util.Objects;

@Getter
@Setter
@Data
public class OrderTableResponse {
    private Long MaSoDatBan;
    private String SoKhach;
    private String Ngay;
    private String Gio;
    private String TrangThai;
    private Long MaSoKhachHang;


    public String getTenPhuongThucThanhToan() {
        return TenPhuongThucThanhToan;
    }

    public void setTenPhuongThucThanhToan(String tenPhuongThucThanhToan) {
        TenPhuongThucThanhToan = tenPhuongThucThanhToan;
    }

    private String AnhNhaHang;
    private String TenPhuongThucThanhToan;

    public String getAnhNhaHang() {
        return AnhNhaHang;
    }

    public void setAnhNhaHang(String anhNhaHang) {
        AnhNhaHang = anhNhaHang;
    }

    public Long getMaSoNhaHang() {
        return MaSoNhaHang;
    }

    public void setMaSoNhaHang(Long maSoNhaHang) {
        MaSoNhaHang = maSoNhaHang;
    }

    private String TenNhaHang;
    private Long MaSoNhaHang;

    public String getDiaChiNhaHang() {
        return DiaChiNhaHang;
    }

    public void setDiaChiNhaHang(String diaChiNhaHang) {
        DiaChiNhaHang = diaChiNhaHang;
    }

    private String DiaChiNhaHang;

    public String getTenNhaHang() {
        return TenNhaHang;
    }

    public void setTenNhaHang(String tenNhaHang) {
        TenNhaHang = tenNhaHang;
    }

    public Long getMaSoKhachHang() {
        return MaSoKhachHang;
    }

    public void setMaSoKhachHang(Long maSoKhachHang) {
        MaSoKhachHang = maSoKhachHang;
    }

    public Long getMaSoDatBan() {
        return MaSoDatBan;
    }

    public void setMaSoDatBan(Long maSoDatBan) {
        MaSoDatBan = maSoDatBan;
    }

    public String getSoKhach() {
        return SoKhach;
    }

    public void setSoKhach(String soKhach) {
        SoKhach = soKhach;
    }

    public String getNgay() {
        return Ngay;
    }

    public void setNgay(String ngay) {
        Ngay = ngay;
    }

    public String getGio() {
        return Gio;
    }

    public void setGio(String gio) {
        Gio = gio;
    }

    public String getTrangThai() {
        return TrangThai;
    }

    public void setTrangThai(String trangThai) {
        TrangThai = trangThai;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        OrderTableResponse that = (OrderTableResponse) o;
        return Objects.equals(MaSoDatBan, that.MaSoDatBan) &&
                Objects.equals(SoKhach, that.SoKhach) &&
                Objects.equals(Ngay, that.Ngay) &&
                Objects.equals(Gio, that.Gio) && Objects.equals(TrangThai, that.TrangThai);
    }

    @Override
    public int hashCode() {
        return Objects.hash(MaSoDatBan, Ngay, Gio, TrangThai, SoKhach);
    }
}
