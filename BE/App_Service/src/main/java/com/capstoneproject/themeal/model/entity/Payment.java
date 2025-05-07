package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "ThanhToan")
public class Payment {
    @Id
    @Column(name = "MaSoThanhToan")
    private String MaSoThanhToan;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaSoDatBan", nullable = false)
    private OrderTable orderTable;
    @Column(name = "SoTienThanhToan", nullable = false)
    private Long SoTienThanhToan;
    @Column(name = "IsDeposit", nullable = false)
    private Boolean IsDeposit;
    @Enumerated(EnumType.STRING)
    @Column(name = "PaymentStatus", nullable = false)
    private PaymentStatus PaymentStatus;
}
