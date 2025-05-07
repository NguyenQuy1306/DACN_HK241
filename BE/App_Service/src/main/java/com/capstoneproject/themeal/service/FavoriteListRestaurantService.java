package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.response.FavoriteListRestaurantResponse;
import com.capstoneproject.themeal.model.response.RestaurantResponse;

public interface FavoriteListRestaurantService {
    List<FavoriteListRestaurantResponse> findByFavoriteListId(Long favoriteListId);
    void deleteByFavoriteListId(Long favoriteListId);
    void addRestaurant(Long favoriteListId, Long restaurantId);
}
