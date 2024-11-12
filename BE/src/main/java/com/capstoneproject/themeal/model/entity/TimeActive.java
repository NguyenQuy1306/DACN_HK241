package com.capstoneproject.themeal.model.entity;

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

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "KhungGioHoatDong")
public class TimeActive {
    @EmbeddedId
    private TimeActiveId MaSo;

    @Column(nullable = false)
    private LocalTime GioMo;
    @Column(nullable = false)
    private LocalTime GioDong;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoNhaHang")
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

}
