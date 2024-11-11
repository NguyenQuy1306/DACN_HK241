package com.curcus.lms.service.impl;

import com.curcus.lms.model.entity.FavoriteListRestaurant;
import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.mapper.FavoriteListRestaurantMapper;
import com.curcus.lms.model.mapper.RestaurantMapper;
import com.curcus.lms.model.response.FavoriteListRestaurantResponse;
import com.curcus.lms.model.response.RestaurantResponse;
import com.curcus.lms.repository.FavoriteListRestaurantRepository;
import com.curcus.lms.service.FavoriteListRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteListRestaurantImpl implements FavoriteListRestaurantService {
    private RestaurantMapper restaurantMapper;
    @Autowired
    FavoriteListRestaurantRepository favoriteListRestaurantRepository;
    @Override
    public List<FavoriteListRestaurantResponse> findByFavoriteListId(Long favoriteListId) {
        List<FavoriteListRestaurant> favoriteListRestaurants = favoriteListRestaurantRepository.findByFavoriteListId(favoriteListId);
        return favoriteListRestaurants.stream().map(FavoriteListRestaurantMapper.INSTANCE::toFavoriteListRestaurantResponse).collect(Collectors.toList());
    }
}
