package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.service.impl.RestaurantCategoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.model.response.RestaurantCategoryResponse;
import com.capstoneproject.themeal.service.RestaurantCategoryService;

import java.util.List;

@RestController
@RequestMapping("api/restaurant-categories")
public class RestaurantCategoryController {
    @Autowired
    private RestaurantCategoryImpl restaurantCategoryService;

    @GetMapping
    ResponseEntity<List<RestaurantCategoryResponse>> getAllRestaurantCategories() {
        List<RestaurantCategoryResponse> restaurantCategoryResponses = restaurantCategoryService.getAll();
        return new ResponseEntity<>(restaurantCategoryResponses, HttpStatus.OK);
    }
}
