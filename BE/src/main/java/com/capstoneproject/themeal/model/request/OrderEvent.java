package com.capstoneproject.themeal.model.request;

import lombok.*;

import java.io.Serializable;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderEvent {
    private Long orderId;
    private Long userId;
    private String bookingTime;
    private String reservationTime;
    private String reservationDate;
    private Byte numGuests;
    private Boolean isFirstBooking;
    private Integer dayOfWeek;
    private Double avgUserCancelRate;
    private String paymentStatus;
    private Double userDistanceKm;
}
