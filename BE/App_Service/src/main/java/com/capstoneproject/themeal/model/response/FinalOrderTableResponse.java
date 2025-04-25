package com.capstoneproject.themeal.model.response;

import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailable;
import com.capstoneproject.themeal.model.entity.OrderTableHasFood;
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
    private String SoKhach;
    private LocalDate Ngay;
    private LocalTime Gio;
    private String TrangThai;
    private String TenKhachHang;
    private Long TienCoc;
    private Long TongTienThanhToan;
    private LocalDateTime ThoiGianTao;
    private Double TyLeHuy;
    private Set<OrderTableHasFoodResponse> DanhSachMonAn;
    private Set<OrderTableHasComboAvailable> DanhSachCombo;
}
