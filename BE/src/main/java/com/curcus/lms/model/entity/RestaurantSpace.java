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

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.ColumnDefault;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "KhongGianNhaHang")
public class RestaurantSpace {
    @EmbeddedId
    private RestaurantSpaceId MaSo;
    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoNhaHang")
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    @Column(nullable = false)
    private Short SoLuongGhe;

    @Column(nullable = false)
    private Short SoLuongRôm;
}
