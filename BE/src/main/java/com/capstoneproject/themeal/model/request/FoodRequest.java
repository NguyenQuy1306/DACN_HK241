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
public class FoodRequest implements Serializable {
    private String Ten;
    private Long Gia;
    private String MoTa;
    private String TrangThai;
}
