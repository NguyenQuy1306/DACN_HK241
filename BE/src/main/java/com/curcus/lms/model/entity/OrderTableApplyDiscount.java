package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "DonDatBan_ApDung_GiamGia")
public class OrderTableApplyDiscount {
    @EmbeddedId
    private OrderTableApplyDiscountId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoDatBan")
    @JoinColumn(name = "MaSoDatBan")
    private OrderTable DonDatBan;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoGiamGia")
    @JoinColumn(name = "MaSoGiamGia")
    private Discount GiamGia;

    @Column(nullable = false)
    private LocalDateTime NgayApDung;
}
