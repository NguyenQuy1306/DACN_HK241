package com.capstoneproject.themeal.model.response;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodResponse implements Serializable {
    private Long MaSoMonAn;
    private String Ten;
    private Long Gia;
    private String MoTa;
    private CategoryResponse DanhMuc;
    private String TrangThai;

    @Override
    public String toString() {
        return "FoodResponse{" +
                "MaSoMonAn=" + MaSoMonAn +
                ", Ten='" + Ten + '\'' +
                ", Gia=" + Gia +
                ", MoTa='" + MoTa + '\'' +
                ", TrangThai='" + TrangThai + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        FoodResponse that = (FoodResponse) o;
        return Objects.equals(MaSoMonAn, that.MaSoMonAn) &&
                Objects.equals(Ten, that.Ten) &&
                Objects.equals(Gia, that.Gia) &&
                Objects.equals(MoTa, that.MoTa) &&
                Objects.equals(TrangThai, that.TrangThai);
    }

    @Override
    public int hashCode() {
        return Objects.hash(MaSoMonAn, Ten, Gia, MoTa, TrangThai);
    }
}
