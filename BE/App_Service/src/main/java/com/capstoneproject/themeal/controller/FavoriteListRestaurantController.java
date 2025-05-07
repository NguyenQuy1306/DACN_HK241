package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.service.FavoriteListRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import com.capstoneproject.themeal.model.response.FavoriteListRestaurantResponse;
import com.capstoneproject.themeal.service.impl.FavoriteListRestaurantImpl;

import java.util.List;

@RestController
@RequestMapping("api/favorite-restaurants")

public class FavoriteListRestaurantController {
    @Autowired
    FavoriteListRestaurantImpl favoriteListRestaurant;
    @Autowired
    private FavoriteListRestaurantService favoriteListRestaurantService;

    @GetMapping("/{favoriteListId}")
    public ResponseEntity<List<FavoriteListRestaurantResponse>> getRestaurantsOfFavoriteList(
            @PathVariable Long favoriteListId) {
        return ResponseEntity.ok(favoriteListRestaurant.findByFavoriteListId(favoriteListId));
    }

    @DeleteMapping("/{favoriteListId}")
    public ResponseEntity<List<FavoriteListRestaurantResponse>> deleteFavoriteList(
            @PathVariable Long favoriteListId) {
        return ResponseEntity.ok(favoriteListRestaurant.findByFavoriteListId(favoriteListId));
    }

    @PostMapping("/addNewRestaurant/list/{favoriteListId}/restaurant/{restaurantId}")
    public ResponseEntity<?> addRestaurantToFavoriteList(
            @PathVariable Long favoriteListId,
            @PathVariable Long restaurantId) {
        favoriteListRestaurantService.addRestaurant(favoriteListId, restaurantId);
        return ResponseEntity.ok("Added successfully");
    }


}
