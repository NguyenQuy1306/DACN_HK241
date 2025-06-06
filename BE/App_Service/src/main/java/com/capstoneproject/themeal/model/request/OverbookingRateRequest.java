package com.capstoneproject.themeal.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OverbookingRateRequest {
    private Integer dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private Long totalBookings;
    private Long canceledOrNoShowBookings;
    private Double overbookingRate;
}