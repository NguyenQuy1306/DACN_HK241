package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "order_prediction_log")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderTrainingEvent {

    @Id
    @Field(targetType = FieldType.INT32, name = "order_id")
    private Long orderId;

    @Field(targetType = FieldType.INT32, name = "user_id")
    private Long userId;

    @Field(targetType = FieldType.STRING, name = "booking_time")
    private String bookingTime;

    @Field(targetType = FieldType.STRING, name = "reservation_time")
    private String reservationTime;

    @Field(targetType = FieldType.STRING, name = "reservation_date")
    private String reservationDate;

    @Field(targetType = FieldType.INT32, name = "num_guests")
    private Byte numGuests;

    @Field(targetType = FieldType.BOOLEAN, name = "is_first_booking")
    private Boolean isFirstBooking;

    @Field(targetType = FieldType.INT32, name = "day_of_week")
    private Integer dayOfWeek;

    @Field(targetType = FieldType.DOUBLE, name = "avg_user_cancel_rate")
    private Double avgUserCancelRate;

    @Field(targetType = FieldType.DOUBLE, name = "user_distance_km")
    private Double userDistanceKm;

    @Field(targetType = FieldType.STRING, name = "payment_status")
    private String paymentStatus;

    @Field(targetType = FieldType.BOOLEAN, name = "used_training")
    private Boolean usedTraining;

    @Field(targetType = FieldType.BOOLEAN, name = "is_arrival")
    private Boolean isArrival;
}
