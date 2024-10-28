package com.curcus.lms.model.response;

import java.io.Serializable;
import java.util.Objects;

import lombok.*;
import java.util.Set;

import com.curcus.lms.model.entity.RestaurantImage;

@Getter
@Setter
public class RestaurantInMapsResponse implements Serializable {
    private Long MaSoNhaHang;
    private String URL;
    private String Ten;
    private String DiaChi;
    private String LoaiHinh;
    private String KhoangGia;
    private String GioHoatDong;
    private String PhuHop;
    private String MonDacSac;
    private String MoTaKhongGian;
    private String DiemDacTrung;
    private Double ViDo;
    private Double KinhDo;
    private Set<String> danhSachAnhNhaHang;

    @Override
    public String toString() {
        return "RestaurantInMapsResponse{" +
                "MaSoNhaHang=" + MaSoNhaHang +
                ", URL='" + URL + '\'' +
                ", Ten='" + Ten + '\'' +
                ", DiaChi=" + DiaChi +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        RestaurantInMapsResponse that = (RestaurantInMapsResponse) o;
        return Objects.equals(MaSoNhaHang, that.MaSoNhaHang) &&
                Objects.equals(URL, that.URL) &&
                Objects.equals(Ten, that.Ten) &&
                Objects.equals(DiaChi, that.DiaChi);
    }

    @Override
    public int hashCode() {
        return Objects.hash(MaSoNhaHang, URL, Ten, DiaChi);
    }

}
