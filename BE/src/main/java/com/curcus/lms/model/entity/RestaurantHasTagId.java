package com.curcus.lms.model.entity;

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
public class RestaurantHasTagId implements Serializable {
    private Long MaSoTag;
    private Long MaSoNhaHang;
}
