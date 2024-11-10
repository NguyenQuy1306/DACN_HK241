package com.curcus.lms.controller;


import com.curcus.lms.model.response.FavoriteListRestaurantResponse;
import com.curcus.lms.service.impl.FavoriteListRestaurantImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("api/favorite-restaurants")
@CrossOrigin("*")
public class FavoriteListRestaurantController {
    @Autowired
    FavoriteListRestaurantImpl favoriteListRestaurant;

    @GetMapping("/{favoriteListId}")
    public ResponseEntity<List<FavoriteListRestaurantResponse>> getRestaurantsOfFavoriteList(@PathVariable Long favoriteListId) {
        return ResponseEntity.ok(favoriteListRestaurant.findByFavoriteListId(favoriteListId));
    }
}
