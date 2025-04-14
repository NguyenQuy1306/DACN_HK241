package com.capstoneproject.themeal.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "user_behavior_logs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBehaviorLog {

    @Id
    private String timestamp;

    @Field(name = "userId")
    private Long userId;


    @Field(name = "restaurant")
    private RestaurantMongoDB restaurant;
}

