package com.capstoneproject.themeal.model.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Embeddable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class RestaurantHasPaymentMethodId implements Serializable {
    private Long MaSoNhaHang;
    private Long MaSoPhuongThucThanhToan;
}
