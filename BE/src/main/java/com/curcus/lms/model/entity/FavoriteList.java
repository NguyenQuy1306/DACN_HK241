package com.curcus.lms.model.entity;

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
@Table(name = "DanhSachYeuThich")
public class FavoriteList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoDanhSachYeuThich")
    private Long MaSoDanhSachYeuThich;

    @Column(nullable = false)
    private String Ten;

    @Column(nullable = false)
    private LocalDateTime ThoiGianCapNhat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaSoKhachHang", referencedColumnName = "MaSoNguoiDung")
    private User khachHang; // Correctly reflects a single user association

    public void setKhachHang(User khachHang) {
        khachHang = khachHang;
    }

    @OneToMany(mappedBy = "DanhSachYeuThich")
    private Set<FavoriteListRestaurant> favoriteListRestaurants;


    public Long getMaSoDanhSachYeuThich() {
        return MaSoDanhSachYeuThich;
    }

    public void setMaSoDanhSachYeuThich(Long maSoDanhSachYeuThich) {
        MaSoDanhSachYeuThich = maSoDanhSachYeuThich;
    }

    public String getTen() {
        return Ten;
    }

    public void setTen(String ten) {
        Ten = ten;
    }

    public LocalDateTime getThoiGianCapNhat() {
        return ThoiGianCapNhat;
    }

    public void setThoiGianCapNhat(LocalDateTime thoiGianCapNhat) {
        ThoiGianCapNhat = thoiGianCapNhat;
    }

    public User getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(Customer khachHang) {
        khachHang = khachHang;
    }

    public Set<FavoriteListRestaurant> getFavoriteListRestaurants() {
        return favoriteListRestaurants;
    }

    public void setFavoriteListRestaurants(Set<FavoriteListRestaurant> favoriteListRestaurants) {
        this.favoriteListRestaurants = favoriteListRestaurants;
    }
}
