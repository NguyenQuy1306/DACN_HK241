package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_prediction_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderPredictionLog {

    @Id
    private Long orderId;

    private Long userId;

    private String bookingTime;
    private String reservationTime;

    private Byte numGuests;
    private Boolean isFirstBooking;
    private Integer dayOfWeek;
    private Double avgUserCancelRate;

    private String weatherForecast;
    private String bookingChannel;
    private String hasDiscountCode;
    private Double userDistanceKm;

    private Double predictedCancelProb;
    private Boolean isCancelled;
}
