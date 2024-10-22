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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "NhaHang_Co_TienIch")
public class RestaurantHasUtility {
    @EmbeddedId
    private RestaurantHasUtilityId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoNhaHang")
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoTienIch")
    @JoinColumn(name = "MaSoTienIch")
    private Utility TienIch;

}
