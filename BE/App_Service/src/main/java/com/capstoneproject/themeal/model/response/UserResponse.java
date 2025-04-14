package com.capstoneproject.themeal.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse implements Serializable {
    private Long userId;
    private String UserRole;
    private String HoTen;
    private String Email;
    private String SDT;
    private String DiaChi;
    private Date NgaySinh;
    private String GioiTinh;

    @Override
    public String toString() {
        return "LoginResponse{" +
                ", UserRole='" + UserRole + '\'' +
                ", HoTen='" + HoTen + '\'' +
                ", Email='" + Email + '\'' +
                ", SDT='" + SDT + '\'' +
                ", DiaChi='" + DiaChi + '\'' +
                ", NgaySinh=" + NgaySinh +
                ", GioiTinh='" + GioiTinh + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserResponse that = (UserResponse) o;
        return Objects.equals(UserRole, that.UserRole) &&
                Objects.equals(HoTen, that.HoTen) &&
                Objects.equals(Email, that.Email) &&
                Objects.equals(SDT, that.SDT) &&
                Objects.equals(DiaChi, that.DiaChi) &&
                Objects.equals(NgaySinh, that.NgaySinh) &&
                Objects.equals(GioiTinh, that.GioiTinh);
    }

    @Override
    public int hashCode() {
        return Objects.hash(UserRole, HoTen, Email, SDT, DiaChi, NgaySinh, GioiTinh);
    }
}