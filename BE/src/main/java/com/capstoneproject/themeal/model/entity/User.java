package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import java.util.Set;
import java.util.List;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "NguoiDung")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "VaiTro", discriminatorType = DiscriminatorType.STRING)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MaSoNguoiDung;

    @Column(nullable = false, unique = true)
    private String Email;

    @Column(nullable = false)
    private String MatKhau;

    @Column(nullable = false)
    private String HoTen;

    private String DiaChi;

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
    }

    @Column(nullable = true, unique = true)
    private String SDT;

    private Date NgaySinh;

    @Column(nullable = false)
    private String GioiTinh = "Nam";

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @OneToMany(mappedBy = "NguoiDung")
    private Set<UserLikeRate> danhSachNguoiDungThichDanhGia;

    public Long getMaSoNguoiDung() {
        return MaSoNguoiDung;
    }

    public void setMaSoNguoiDung(Long maSoNguoiDung) {
        this.MaSoNguoiDung = maSoNguoiDung;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getHoTen() {
        return HoTen;
    }

    public void setHoTen(String hoTen) {
        HoTen = hoTen;
    }

    public String getSDT() {
        return SDT;
    }

    public void setSDT(String SDT) {
        this.SDT = SDT;
    }

    public Date getNgaySinh() {
        return NgaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        NgaySinh = ngaySinh;
    }

    public String getGioiTinh() {
        return GioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        GioiTinh = gioiTinh;
    }

    public Set<UserLikeRate> getDanhSachNguoiDungThichDanhGia() {
        return danhSachNguoiDungThichDanhGia;
    }

    public void setDanhSachNguoiDungThichDanhGia(Set<UserLikeRate> danhSachNguoiDungThichDanhGia) {
        this.danhSachNguoiDungThichDanhGia = danhSachNguoiDungThichDanhGia;
    }

    @Transient
    public String getDiscriminatorValue() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}
