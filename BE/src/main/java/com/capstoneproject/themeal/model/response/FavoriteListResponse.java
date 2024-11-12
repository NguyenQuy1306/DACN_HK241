package com.capstoneproject.themeal.model.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springdoc.core.configuration.SpringDocUIConfiguration;

import com.capstoneproject.themeal.model.entity.FavoriteListRestaurant;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Setter
@Getter
@Data
public class FavoriteListResponse {
    private String Ten;
    private Long MaSoDanhSachYeuThich;
    private LocalDateTime ThoiGianCapNhat;
    private Long SoLuongNhaHang;

    public Long getSoLuongNhaHang() {
        return SoLuongNhaHang;
    }

    public void setSoLuongNhaHang(Long soLuongNhaHang) {
        SoLuongNhaHang = soLuongNhaHang;
    }

    public String getTen() {
        return Ten;
    }

    public void setTen(String ten) {
        Ten = ten;
    }

    public Long getMaSoDanhSachYeuThich() {
        return MaSoDanhSachYeuThich;
    }

    public void setMaSoDanhSachYeuThich(Long maSoDanhSachYeuThich) {
        MaSoDanhSachYeuThich = maSoDanhSachYeuThich;
    }

    public LocalDateTime getThoiGianCapNhat() {
        return ThoiGianCapNhat;
    }

    public void setThoiGianCapNhat(LocalDateTime thoiGianCapNhat) {
        ThoiGianCapNhat = thoiGianCapNhat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || this.getClass() != o.getClass()) {
            return false;
        }

        FavoriteListResponse that = (FavoriteListResponse) o;

        return Objects.equals(this.Ten, that.Ten)
                && Objects.equals(this.MaSoDanhSachYeuThich, that.MaSoDanhSachYeuThich)
                && Objects.equals(this.ThoiGianCapNhat, that.ThoiGianCapNhat);

    }

    @Override
    public int hashCode() {
        return Objects.hash(Ten, MaSoDanhSachYeuThich, ThoiGianCapNhat);
    }
}
