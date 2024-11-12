package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.request.RegisterRestaurantRequest;
import com.capstoneproject.themeal.model.response.RegisterRestaurantResponse;

public interface RegisterRestaurantService {
    RegisterRestaurantResponse addNewRequest(RegisterRestaurantRequest registerRestaurantRequest);
}
