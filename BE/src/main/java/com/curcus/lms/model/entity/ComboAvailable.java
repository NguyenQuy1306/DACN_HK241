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
@Table(name = "ComBoCoSan")
public class ComboAvailable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoComBoCoSan")
    private Long MaSoComBoCoSan;

    @Column(nullable = false)
    private String Ten;
    @Column(nullable = false)
    private Long Gia;
    @Column(nullable = false)
    private LocalDateTime ThoiGianTao;

    @ManyToOne
    @JoinColumn(name = "MaSoNhahang")
    private Restaurant NhaHang;

    @ManyToOne
    @JoinColumn(name = "MaSoChuNhaHang", referencedColumnName = "MaSoNguoiDung")
    private User ChuNhaHang;

    @OneToMany(mappedBy = "ComboCoSan")
    private Set<OrderTableHasComboAvailable> danhSachDonDatBanCoComboCoSan;

    @OneToMany(mappedBy = "ComboCoSan")
    private Set<ComboAvailableHasFood> danhSachComboCoSanCoMonan;
}
