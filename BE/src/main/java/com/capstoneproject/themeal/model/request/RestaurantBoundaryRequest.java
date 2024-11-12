package com.capstoneproject.themeal.model.request;

import java.io.Serializable;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantBoundaryRequest implements Serializable {
    private double bl_latitude;
    private double bl_longitude;
    private double tr_latitude;
    private double tr_longitude;
}
