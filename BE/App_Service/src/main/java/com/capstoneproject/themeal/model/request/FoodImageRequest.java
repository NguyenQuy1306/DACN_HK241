package com.capstoneproject.themeal.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodImageRequest {
    private Long foodId;
    private Long restaurantId;
}
