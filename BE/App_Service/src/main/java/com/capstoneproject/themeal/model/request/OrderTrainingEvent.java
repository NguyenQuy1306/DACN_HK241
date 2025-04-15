package com.capstoneproject.themeal.model.request;

import lombok.*;

import java.io.Serializable;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderTrainingEvent {
    private Long orderId;
    private Long userId;
    private String bookingTime;
    private String reservationTime;
    private String reservationDate;
    private Byte numGuests;
    private Boolean isFirstBooking;
    private Integer dayOfWeek;
    private Double avgUserCancelRate;
    private Double userDistanceKm;
    private String paymentStatus;
    private Boolean usedTraining;
    private Boolean isArrival;
}
