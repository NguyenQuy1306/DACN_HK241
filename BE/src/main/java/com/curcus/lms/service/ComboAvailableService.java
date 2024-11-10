package com.curcus.lms.service;

import java.util.List;

import com.curcus.lms.model.entity.ComboAvailable;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import org.springframework.data.domain.Pageable;

public interface ComboAvailableService {
    // List<RestaurantResponse> getRestaurants();

    List<ComboAvailableHasFoodResponse> getAvailableCombos(Pageable pageable, Long restaurantId);

}
