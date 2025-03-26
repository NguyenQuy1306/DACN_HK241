package com.capstoneproject.themeal.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {
    private String name;
    private String imageUrl;
    private Long restaurantId;
}
