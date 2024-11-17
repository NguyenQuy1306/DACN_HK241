package com.capstoneproject.themeal.model.request;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.TableAvailableId;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CreateOrderRequest implements Serializable {

    private Long customerID;
    private Short tableId;
    private Long comboId; // Optional field
    private Long restaurantId;
    private List<FoodOrderRequest> foodOrderRequests;
    // Getters and setters

}
