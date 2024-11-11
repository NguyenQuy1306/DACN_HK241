package com.curcus.lms.model.entity;

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
public class FavoriteListRestaurantId implements Serializable {
    private Long MaSoNhaHang;
    private Long MaSoDanhSachYeuThich;
}
