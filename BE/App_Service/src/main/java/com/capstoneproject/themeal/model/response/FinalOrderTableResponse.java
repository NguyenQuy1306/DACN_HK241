package com.capstoneproject.themeal.model.response;

import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailable;
import com.capstoneproject.themeal.model.entity.OrderTableHasFood;
import com.capstoneproject.themeal.model.entity.OrderTableStatus;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Data

public class FinalOrderTableResponse implements Serializable {
    private Long MaSoDatBan;
    private Byte SoKhach;
    private LocalDate Ngay;
    private LocalTime Gio;
    private OrderTableStatus TrangThai;
    private String TenKhachHang;
    private Long TienCoc;
    private Long TongTienThanhToan;
    private LocalDateTime ThoiGianTao;
    private Double TyLeHuy;

    // Constructor matching exactly
    public FinalOrderTableResponse(
            Long MaSoDatBan,
            Byte SoKhach,
            LocalDate Ngay,
            LocalTime Gio,
            OrderTableStatus TrangThai,
            String TenKhachHang,
            Long TienCoc,
            Long TongTienThanhToan,
            LocalDateTime ThoiGianTao,
            Double TyLeHuy) {
        this.MaSoDatBan = MaSoDatBan;
        this.SoKhach = SoKhach;
        this.Ngay = Ngay;
        this.Gio = Gio;
        this.TrangThai = TrangThai;
        this.TenKhachHang = TenKhachHang;
        this.TienCoc = TienCoc;
        this.TongTienThanhToan = TongTienThanhToan;
        this.ThoiGianTao = ThoiGianTao;
        this.TyLeHuy = TyLeHuy;
    }
}
