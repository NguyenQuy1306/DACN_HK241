package com.capstoneproject.themeal.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodImageResponse {
    private Long restaurantId;
    private Long foodId;
    private List<String> imageUrl;
}
