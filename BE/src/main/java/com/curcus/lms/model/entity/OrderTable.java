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
    private Set<OrderTableHasComboAvailable> DanhSachDonDatBanCoComboCoSan;

    public Long getMaSoDatBan() {
        return MaSoDatBan;
    }

    public void setMaSoDatBan(Long maSoDatBan) {
        MaSoDatBan = maSoDatBan;
    }

    public String getSoKhach() {
        return SoKhach;
    }

    public void setSoKhach(String soKhach) {
        SoKhach = soKhach;
    }

    public String getNgay() {
        return Ngay;
    }

    public void setNgay(String ngay) {
        Ngay = ngay;
    }

    public String getGio() {
        return Gio;
    }

    public void setGio(String gio) {
        Gio = gio;
    }

    public String getTrangThai() {
        return TrangThai;
    }

    public void setTrangThai(String trangThai) {
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
