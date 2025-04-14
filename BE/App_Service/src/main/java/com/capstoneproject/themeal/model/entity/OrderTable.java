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
import org.springframework.cglib.core.Local;
import org.apache.kafka.common.protocol.types.Field.Bool;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private Byte SoKhach;

    @Column(nullable = false)
    private LocalDate Ngay;

    @Column(nullable = false)
    private LocalTime Gio;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderTableStatus TrangThai;

    @Column(nullable = false)
    private Long TienDatCoc;

    @Column(nullable = false)
    private Boolean StatusDepositRefund;

    @Column(nullable = false)
    private Long TongTienThanhToan;

    @Column
    private Double PercentNoShow;

    @Column(nullable = false)
    private LocalDateTime orderAt;

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
    private Set<OrderTableHasComboAvailable> DanhSachDonDatBanCoComboCoSan;


    public Long getMaSoDatBan() {
        return MaSoDatBan;
    }

    public void setMaSoDatBan(Long maSoDatBan) {
        MaSoDatBan = maSoDatBan;
    }

    public Byte getSoKhach() {
        return SoKhach;
    }

    public void setSoKhach(Byte soKhach) {
        SoKhach = soKhach;
    }

    public LocalDate getNgay() {
        return Ngay;
    }

    public void setNgay(LocalDate ngay) {
        Ngay = ngay;
    }

    public LocalTime getGio() {
        return Gio;
    }

    public void setGio(LocalTime gio) {
        Gio = gio;
    }

    public OrderTableStatus getTrangThai() {
        return TrangThai;
    }

    public void setTrangThai(OrderTableStatus trangThai) {
        TrangThai = trangThai;
    }

    public PaymentMethod getPhuongThucThanhToan() {
        return PhuongThucThanhToan;
    }

    public void setPhuongThucThanhToan(PaymentMethod phuongThucThanhToan) {
        PhuongThucThanhToan = phuongThucThanhToan;
    }

    public User getKhachHang() {
        return KhachHang;
    }

    public void setKhachHang(User khachHang) {
        KhachHang = khachHang;
    }

    public Restaurant getNhaHang() {
        return NhaHang;
    }

    public void setNhaHang(Restaurant nhaHang) {
        NhaHang = nhaHang;
    }

    public Set<OrderTableHasComboAvailable> getDanhSachDonDatBanCoComboCoSan() {
        return DanhSachDonDatBanCoComboCoSan;
    }

    public void setDanhSachDonDatBanCoComboCoSan(Set<OrderTableHasComboAvailable> danhSachDonDatBanCoComboCoSan) {
        this.DanhSachDonDatBanCoComboCoSan = danhSachDonDatBanCoComboCoSan;
    }

    public Set<OrderTableHasFood> getDanhSachDonDatBanCoMonAn() {
        return DanhSachDonDatBanCoMonAn;
    }

    public void setDanhSachDonDatBanCoMonAn(Set<OrderTableHasFood> danhSachDonDatBanCoMonAn) {
        this.DanhSachDonDatBanCoMonAn = danhSachDonDatBanCoMonAn;
    }

    public Set<OrderTableApplyDiscount> getDanhSachDonDatBanApDungGiamGia() {
        return DanhSachDonDatBanApDungGiamGia;
    }

    public void setDanhSachDonDatBanApDungGiamGia(Set<OrderTableApplyDiscount> danhSachDonDatBanApDungGiamGia) {
        this.DanhSachDonDatBanApDungGiamGia = danhSachDonDatBanApDungGiamGia;
    }

    @OneToMany(mappedBy = "DonDatBan")
    private Set<OrderTableHasFood> DanhSachDonDatBanCoMonAn;
    @OneToMany(mappedBy = "DonDatBan")
    private Set<OrderTableApplyDiscount> DanhSachDonDatBanApDungGiamGia;

}
