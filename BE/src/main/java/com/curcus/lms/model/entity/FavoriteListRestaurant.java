package com.curcus.lms.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "DanhSachYeuThich_NhaHang")
public class FavoriteListRestaurant {
    @EmbeddedId
    private FavoriteListRestaurantId MaSo;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("MaSoDanhSachYeuThich")
    @JoinColumn(name = "MaSoDanhSachYeuThich")
    private FavoriteList DanhSachYeuThich;

    public FavoriteListRestaurantId getMaSo() {
        return MaSo;
    }

    public void setMaSo(FavoriteListRestaurantId maSo) {
        MaSo = maSo;
    }

    public FavoriteList getDanhSachYeuThich() {
        return DanhSachYeuThich;
    }

    public void setDanhSachYeuThich(FavoriteList danhSachYeuThich) {
        DanhSachYeuThich = danhSachYeuThich;
    }

    public Restaurant getNhaHang() {
        return NhaHang;
    }

    public void setNhaHang(Restaurant nhaHang) {
        NhaHang = nhaHang;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("MaSoNhaHang")
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;


}
