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
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "GiamGia")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "DiscountType", discriminatorType = DiscriminatorType.STRING)
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoGiamGia")
    private Long MaSoGiamGia;
    @Column(nullable = false)
    private UUID Code;
    @Column(nullable = false)
    private Byte PhanTramGiam;
    @Column(nullable = false)
    private LocalDateTime NgayTao;
    @Column(nullable = false)
    private LocalDateTime NgayBatDau;
    @Column(nullable = false)
    private LocalDateTime NgayKetThuc;

    @ManyToOne
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    @ManyToOne
    @JoinColumn(name = "MaSoMonAn")
    private Food MonAn;

    @OneToMany(mappedBy = "GiamGia")
    private Set<OrderTableApplyDiscount> danhSachDonDatBanApDungGiamGia;
}
