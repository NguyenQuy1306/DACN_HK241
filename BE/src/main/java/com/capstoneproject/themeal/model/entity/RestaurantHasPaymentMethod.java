package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "NhaHang_Co_PhuongThucThanhToan")
public class RestaurantHasPaymentMethod {
    @EmbeddedId
    private RestaurantHasPaymentMethodId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoNhaHang")
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoPhuongThucThanhToan")
    @JoinColumn(name = "MaSoPhuongThucThanhToan")
    private PaymentMethod PhuongThucThanhToan;

}
