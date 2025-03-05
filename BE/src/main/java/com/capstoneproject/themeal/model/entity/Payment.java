package com.capstoneproject.themeal.model.entity;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Column(name = "SoTienThanhToan", nullable = false)
    private Long SoTienThanhToan;
    @Column(name = "IsDeposit", nullable = false)
    private Boolean IsDeposit;
    @Enumerated(EnumType.STRING)
    @Column(name = "PaymentStatus", nullable = false)
    private PaymentStatus PaymentStatus;
}
