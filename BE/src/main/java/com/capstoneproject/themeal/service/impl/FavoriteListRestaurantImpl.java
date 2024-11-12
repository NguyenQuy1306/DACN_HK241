package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.FavoriteListRestaurant;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.mapper.FavoriteListRestaurantMapper;
import com.capstoneproject.themeal.model.mapper.RestaurantMapper;
import com.capstoneproject.themeal.model.response.FavoriteListRestaurantResponse;
import com.capstoneproject.themeal.model.response.RestaurantResponse;
import com.capstoneproject.themeal.repository.FavoriteListRestaurantRepository;
import com.capstoneproject.themeal.service.FavoriteListRestaurantService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteListRestaurantImpl implements FavoriteListRestaurantService {
    private RestaurantMapper restaurantMapper;
    @Autowired
    FavoriteListRestaurantRepository favoriteListRestaurantRepository;

    @Override
    public List<FavoriteListRestaurantResponse> findByFavoriteListId(Long favoriteListId) {
        List<FavoriteListRestaurant> favoriteListRestaurants = favoriteListRestaurantRepository
                .findByFavoriteListId(favoriteListId);
        return favoriteListRestaurants.stream()
                .map(FavoriteListRestaurantMapper.INSTANCE::toFavoriteListRestaurantResponse)
                .collect(Collectors.toList());
    }
}
