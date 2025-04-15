package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert
@Table(name = "DonDatBanDuDoan")
public class OrderPredict {
    @Id
    private Long id;
    @Column(nullable = false)
    private Long orderId;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private String bookingTime;
    @Column(nullable = false)
    private String reservationTime;
    @Column(nullable = false)
    private String reservationDate;
    @Column(nullable = false)
    private Byte numGuests;
    @Column(nullable = false)
    private Boolean isFirstBooking;
    @Column(nullable = false)
    private Integer dayOfWeek;
    @Column(nullable = false)
    private Double avgUserCancelRate;
    @Column(nullable = false)
    private Double userDistanceKm;
    @Column(nullable = false)
    private String paymentStatus;
}
