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
@Table(name = "NhaHang")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoNhaHang")
    private Long MaSoNhaHang;

    // @Column(nullable = false)
    // private String courseThumbnail;
    @Column(nullable = false)
    private String URL;
    @Column(nullable = false)
    private String Ten;
    @Column(nullable = false)
    private String DiaChi;
    @Column(nullable = false)
    private String LoaiHinh;
    @Column(nullable = false)
    private String KhoangGia;
    @Column(nullable = false)
    private String GioHoatDong;
    @Column(nullable = false, columnDefinition = "VARCHAR")
    private String PhuHop;
    @Column(nullable = false, columnDefinition = "VARCHAR")
    private String MonDacSac;
    @Column(nullable = false, columnDefinition = "VARCHAR")
    private String MoTaKhongGian;
    @Column(nullable = false, columnDefinition = "VARCHAR")
    private String DiemDacTrung;
    private String KinhDo;
    private String ViDo;

    // dư thuộc tính~
    private String LoaiAmThuc;
    private String KieuNhaHang;
    private String TrangThai;

    @OneToMany(mappedBy = "NhaHang")
    private Set<FavoriteListRestaurant> danhSachNhaHangYeuThich;

    @OneToMany(mappedBy = "NhaHang")
    private Set<TimeActive> danhSachKhungGioHoatDong;

    @OneToMany(mappedBy = "NhaHang")
    private Set<RestaurantHasUtility> danhSachNhahangCoTienIch;

    @OneToMany(mappedBy = "NhaHang")
    private Set<RestaurantSpace> danhSachKhongGianNhaHang;

    @OneToMany(mappedBy = "NhaHang")
    private Set<RestaurantHasPaymentMethod> danhSachNhaHangCoPhuongThucThanhToan;

    @ManyToOne
    @JoinColumn(name = "MaSoChuNhaHang", referencedColumnName = "MaSoNguoiDung")
    private User ChuNhaHang;

    // @OneToMany(fetch = FetchType.LAZY, mappedBy = "course", cascade =
    // CascadeType.ALL)
    // Set<Enrollment> enrollment;

    // @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy =
    // "course")
    // Set<Section> sections;

    // @Override
    // public String toString() {
    // return "Course [courseId=" + courseId + ", title=" + title + ", description="
    // + description + ", price=" + price
    // + ", instructor=" + instructor.getUserId() + ", category=" + category + ",
    // enrollment=" + enrollment
    // + "]";
    // }

}
