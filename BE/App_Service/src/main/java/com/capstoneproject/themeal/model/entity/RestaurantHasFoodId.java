package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class RestaurantHasFoodId implements Serializable {
    private Long MaSoMonAn;
    private Long MaSoNhaHang;
}
