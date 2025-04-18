package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
