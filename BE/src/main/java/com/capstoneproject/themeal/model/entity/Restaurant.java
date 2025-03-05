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
@Data
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
    private Double KinhDo;
    private Double ViDo;

    // dư thuộc tính~
    private String LoaiAmThuc;
    private String KieuNhaHang;
    private String TrangThai;

    @OneToMany(mappedBy = "NhaHang")
    private Set<FavoriteListRestaurant> DanhSachNhaHangYeuThich;

    @OneToMany(mappedBy = "NhaHang")
    private Set<TimeActive> DanhSachKhungGioHoatDong;

    @OneToMany(mappedBy = "NhaHang")
    private Set<RestaurantHasUtility> DanhSachNhahangCoTienIch;

    @OneToMany(mappedBy = "NhaHang")
    private Set<RestaurantSpace> DanhSachKhongGianNhaHang;

    @OneToMany(mappedBy = "NhaHang")
    private Set<RestaurantHasPaymentMethod> DanhSachNhaHangCoPhuongThucThanhToan;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "NhaHang")
    private Set<RestaurantImage> DanhSachAnhNhaHang;

    @OneToMany(mappedBy = "NhaHang")
    private Set<TableAvailable> DanhSachBan;

    @OneToOne(mappedBy = "NhaHang")
    private Deposit DatCoc;

    @ManyToOne
    @JoinColumn(name = "MaSoChuNhaHang", referencedColumnName = "MaSoNguoiDung")
    private User ChuNhaHang;

    @ManyToOne
    @JoinColumn(name = "MaSoDanhMucNhaHang", referencedColumnName = "maSoDanhMucNhaHang")
    private RestaurantCategory DanhMucNhaHang;

    @Override
    public String toString() {
        return "Restaurant{" +
                "MaSoNhaHang=" + MaSoNhaHang +
                ", URL='" + URL + '\'' +
                ", Ten='" + Ten + '\'' +
                ", DiaChi='" + DiaChi + '\'' +
                ", LoaiHinh='" + LoaiHinh + '\'' +
                ", KhoangGia='" + KhoangGia + '\'' +
                ", GioHoatDong='" + GioHoatDong + '\'' +
                ", PhuHop='" + PhuHop + '\'' +
                ", MonDacSac='" + MonDacSac + '\'' +
                ", MoTaKhongGian='" + MoTaKhongGian + '\'' +
                ", DiemDacTrung='" + DiemDacTrung + '\'' +
                ", KinhDo=" + KinhDo +
                ", ViDo=" + ViDo +
                ", LoaiAmThuc='" + LoaiAmThuc + '\'' +
                ", KieuNhaHang='" + KieuNhaHang + '\'' +
                ", TrangThai='" + TrangThai + '\'' +
                '}';
    }

    public Long getMaSoNhaHang() {
        return MaSoNhaHang;
    }

    public void setMaSoNhaHang(Long maSoNhaHang) {
        MaSoNhaHang = maSoNhaHang;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public String getTen() {
        return Ten;
    }

    public void setTen(String ten) {
        Ten = ten;
    }

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
    }

    public String getLoaiHinh() {
        return LoaiHinh;
    }

    public void setLoaiHinh(String loaiHinh) {
        LoaiHinh = loaiHinh;
    }

    public String getKhoangGia() {
        return KhoangGia;
    }

    public void setKhoangGia(String khoangGia) {
        KhoangGia = khoangGia;
    }

    public String getGioHoatDong() {
        return GioHoatDong;
    }

    public void setGioHoatDong(String gioHoatDong) {
        GioHoatDong = gioHoatDong;
    }

    public String getPhuHop() {
        return PhuHop;
    }

    public void setPhuHop(String phuHop) {
        PhuHop = phuHop;
    }

    public String getMonDacSac() {
        return MonDacSac;
    }

    public void setMonDacSac(String monDacSac) {
        MonDacSac = monDacSac;
    }

    public String getMoTaKhongGian() {
        return MoTaKhongGian;
    }

    public void setMoTaKhongGian(String moTaKhongGian) {
        MoTaKhongGian = moTaKhongGian;
    }

    public String getDiemDacTrung() {
        return DiemDacTrung;
    }

    public void setDiemDacTrung(String diemDacTrung) {
        DiemDacTrung = diemDacTrung;
    }

    public Double getKinhDo() {
        return KinhDo;
    }

    public void setKinhDo(Double kinhDo) {
        KinhDo = kinhDo;
    }

    public Double getViDo() {
        return ViDo;
    }

    public void setViDo(Double viDo) {
        ViDo = viDo;
    }

    public String getLoaiAmThuc() {
        return LoaiAmThuc;
    }

    public void setLoaiAmThuc(String loaiAmThuc) {
        LoaiAmThuc = loaiAmThuc;
    }

    public String getKieuNhaHang() {
        return KieuNhaHang;
    }

    public void setKieuNhaHang(String kieuNhaHang) {
        KieuNhaHang = kieuNhaHang;
    }

    public String getTrangThai() {
        return TrangThai;
    }

    public void setTrangThai(String trangThai) {
        TrangThai = trangThai;
    }

    public Set<FavoriteListRestaurant> getDanhSachNhaHangYeuThich() {
        return DanhSachNhaHangYeuThich;
    }

    public void setDanhSachNhaHangYeuThich(Set<FavoriteListRestaurant> danhSachNhaHangYeuThich) {
        DanhSachNhaHangYeuThich = danhSachNhaHangYeuThich;
    }

    public Set<TimeActive> getDanhSachKhungGioHoatDong() {
        return DanhSachKhungGioHoatDong;
    }

    public void setDanhSachKhungGioHoatDong(Set<TimeActive> danhSachKhungGioHoatDong) {
        DanhSachKhungGioHoatDong = danhSachKhungGioHoatDong;
    }

    public Set<RestaurantHasUtility> getDanhSachNhahangCoTienIch() {
        return DanhSachNhahangCoTienIch;
    }

    public void setDanhSachNhahangCoTienIch(Set<RestaurantHasUtility> danhSachNhahangCoTienIch) {
        DanhSachNhahangCoTienIch = danhSachNhahangCoTienIch;
    }

    public Set<RestaurantSpace> getDanhSachKhongGianNhaHang() {
        return DanhSachKhongGianNhaHang;
    }

    public void setDanhSachKhongGianNhaHang(Set<RestaurantSpace> danhSachKhongGianNhaHang) {
        DanhSachKhongGianNhaHang = danhSachKhongGianNhaHang;
    }

    public Set<RestaurantHasPaymentMethod> getDanhSachNhaHangCoPhuongThucThanhToan() {
        return DanhSachNhaHangCoPhuongThucThanhToan;
    }

    public void setDanhSachNhaHangCoPhuongThucThanhToan(
            Set<RestaurantHasPaymentMethod> danhSachNhaHangCoPhuongThucThanhToan) {
        DanhSachNhaHangCoPhuongThucThanhToan = danhSachNhaHangCoPhuongThucThanhToan;
    }

    public Set<RestaurantImage> getDanhSachAnhNhaHang() {
        return DanhSachAnhNhaHang;
    }

    public void setDanhSachAnhNhaHang(Set<RestaurantImage> danhSachAnhNhaHang) {
        DanhSachAnhNhaHang = danhSachAnhNhaHang;
    }

    public User getChuNhaHang() {
        return ChuNhaHang;
    }

    public void setChuNhaHang(User chuNhaHang) {
        ChuNhaHang = chuNhaHang;
    }

    public RestaurantCategory getDanhMucNhaHang() {
        return DanhMucNhaHang;
    }

    public void setDanhMucNhaHang(RestaurantCategory danhMucNhaHang) {
        DanhMucNhaHang = danhMucNhaHang;
    }
}
