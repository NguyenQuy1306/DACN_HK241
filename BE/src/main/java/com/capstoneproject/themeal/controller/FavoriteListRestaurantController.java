package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import com.capstoneproject.themeal.model.response.FavoriteListRestaurantResponse;
import com.capstoneproject.themeal.service.impl.FavoriteListRestaurantImpl;

import java.util.List;

@RestController
@RequestMapping("api/favorite-restaurants")
@CrossOrigin("*")
public class FavoriteListRestaurantController {
    @Autowired
    FavoriteListRestaurantImpl favoriteListRestaurant;

    @GetMapping("/{favoriteListId}")
    public ResponseEntity<List<FavoriteListRestaurantResponse>> getRestaurantsOfFavoriteList(
            @PathVariable Long favoriteListId) {
        return ResponseEntity.ok(favoriteListRestaurant.findByFavoriteListId(favoriteListId));
    }
}
