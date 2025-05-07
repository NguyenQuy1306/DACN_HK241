package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Setter
@Getter
@Table(name = "weekly_overbooking_rate")
public class WeeklyOverbookingRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "masonhahang")
    private Long restaurantId;

    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek;  // Số ngày trong tuần (1: Thứ 2, ..., 7: Chủ Nhật)

    @Column(name = "overbooking_rate", nullable = false)
    private Double overbookingRate;  // Tỷ lệ overbooking cho ngày đó

    @Column(name = "maxoverbooking", nullable = false)
    private Long maxoverbooking;  // Tỷ lệ overbooking cho ngày đó


}
