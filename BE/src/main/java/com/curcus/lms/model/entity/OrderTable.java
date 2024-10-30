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
@Table(name = "DonDatBan")
public class OrderTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoDatBan")
    private Long MaSoDatBan;

    @Column(nullable = false)
    private String SoKhach;
    @Column(nullable = false)
    private String Ngay;
    @Column(nullable = false)
    private String Gio;
    @Column(nullable = false)
    private String TrangThai;

    @ManyToOne
    @JoinColumn(name = "MaSoPhuongThucThanhToan")
    private PaymentMethod PhuongThucThanhToan;

    @ManyToOne
    @JoinColumn(name = "MaSoKhachHang", referencedColumnName = "MaSoNguoiDung")
    private User KhachHang;

    @ManyToOne
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    @OneToMany(mappedBy = "DonDatBan")
    private Set<OrderTableHasComboAvailable> danhSachDonDatBanCoComboCoSan;

    @OneToMany(mappedBy = "DonDatBan")
    private Set<OrderTableHasFood> danhSachDonDatBanCoMonAn;
    @OneToMany(mappedBy = "DonDatBan")
    private Set<OrderTableApplyDiscount> danhSachDonDatBanApDungGiamGia;

}
