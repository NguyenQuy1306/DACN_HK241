package com.curcus.lms.service;

import com.curcus.lms.model.request.RegisterRestaurantRequest;
import com.curcus.lms.model.response.RegisterRestaurantResponse;

public interface RegisterRestaurantService {
    RegisterRestaurantResponse addNewRequest(RegisterRestaurantRequest registerRestaurantRequest);
}
