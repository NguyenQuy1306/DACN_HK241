package com.curcus.lms.service;

import com.curcus.lms.model.response.FavoriteListRestaurantResponse;
import com.curcus.lms.model.response.RestaurantResponse;

import java.util.List;

public interface FavoriteListRestaurantService {
    List<FavoriteListRestaurantResponse> findByFavoriteListId(Long favoriteListId);
}
