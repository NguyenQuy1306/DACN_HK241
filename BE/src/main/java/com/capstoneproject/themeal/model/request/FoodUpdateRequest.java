package com.capstoneproject.themeal.model.request;

import java.io.Serializable;

import com.capstoneproject.themeal.model.entity.RestaurantImage;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodUpdateRequest implements Serializable {
    private String name;
    private String type;
    private Long price;
    private String description;
    private Long id;
    private String category;
    private Double discount;
    private String image;
}

