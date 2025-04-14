package com.capstoneproject.themeal.model.entity;

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
@Table(name = "DanhGia")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoDanhGia")
    private Long MaSoDanhGia;

    @Column(nullable = false, length = 3000)
    private String NoiDung;
    @Column(nullable = false)
    private Double Sao;

    @Column(nullable = false, name = "thoigiancapnhat")
    private LocalDateTime ThoiGianCapNhat;

    @Column()
    private LocalDateTime ThoiGianTraiNghiem;

    @ManyToOne
    @JoinColumn(name = "MaSoNguoiDung", referencedColumnName = "MaSoNguoiDung")
    private User NguoiDung;

    @ManyToOne
    @JoinColumn(name = "MaSoNhaHang", referencedColumnName = "MaSoNhaHang")
    private Restaurant NhaHang;

    @OneToMany(mappedBy = "DanhGia")
    private Set<UserLikeRate> danhSachNguoiDungThichDanhGia;

    @OneToMany(mappedBy = "DanhGia")
    private Set<RestaurantImage> DanhSachAnhNhaHang;
}
