package com.curcus.lms.controller;

import com.curcus.lms.exception.NotFoundException;
import com.curcus.lms.exception.ValidationException;
import com.curcus.lms.model.response.ResponseCode;
import com.curcus.lms.model.response.RestaurantCategoryResponse;
import com.curcus.lms.service.RestaurantCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/restaurant-categories")
@CrossOrigin(origins = "*")
public class RestaurantCategoryController {
    @Autowired
    private RestaurantCategoryService restaurantCategoryService;
    @GetMapping
    ResponseEntity<List<RestaurantCategoryResponse>> getAllRestaurantCategories() {
        List<RestaurantCategoryResponse> restaurantCategoryResponses = restaurantCategoryService.getAll();
        return new ResponseEntity<>(restaurantCategoryResponses,HttpStatus.OK);
    }
}
