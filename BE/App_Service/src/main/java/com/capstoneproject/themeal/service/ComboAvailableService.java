package com.capstoneproject.themeal.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface ComboAvailableService {
    // List<RestaurantResponse> getRestaurants();

    List<ComboAvailableHasFoodResponse> getAvailableCombos(Pageable pageable, Long restaurantId);

    public boolean isComboExists(Long comboId, Long restaurantId);

}
