package com.capstoneproject.themeal.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class RestaurantCategoryResponse {
    private Long maSoDanhMucNhaHang;
    private String ten;
    private String linkAnh;

    public Long getMaSoDanhMucNhaHang() {
        return maSoDanhMucNhaHang;
    }

    public void setMaSoDanhMucNhaHang(Long maSoDanhMucNhaHang) {
        this.maSoDanhMucNhaHang = maSoDanhMucNhaHang;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getLinkAnh() {
        return linkAnh;
    }

    public void setLinkAnh(String linkAnh) {
        this.linkAnh = linkAnh;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        RestaurantCategoryResponse that = (RestaurantCategoryResponse) o;
        return Objects.equals(maSoDanhMucNhaHang, that.maSoDanhMucNhaHang) &&
                Objects.equals(ten, that.ten) &&
                Objects.equals(linkAnh, that.linkAnh);
    }

    @Override
    public int hashCode() {
        return Objects.hash(maSoDanhMucNhaHang, ten, linkAnh);
    }
}
