package com.capstoneproject.themeal.model.request;

import lombok.Data;

@Data
public class BehaviorRequest {
    private String userId;
    private String restaurantId;
    private int timeSpent;
    private boolean liked;
}
