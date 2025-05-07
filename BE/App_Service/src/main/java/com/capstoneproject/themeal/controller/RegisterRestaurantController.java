package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.model.mapper.RegisterRestaurantMapper;
import com.capstoneproject.themeal.model.request.RegisterRestaurantRequest;
import com.capstoneproject.themeal.model.response.RegisterRestaurantResponse;
import com.capstoneproject.themeal.service.impl.RegisterRestaurantImpl;

@RestController
@RequestMapping("api/register-restaurant")

public class RegisterRestaurantController {
    @Autowired
    RegisterRestaurantImpl registerRestaurant;

    @PostMapping
    ResponseEntity<RegisterRestaurantResponse> addNewRegisterRequest(
            @RequestBody RegisterRestaurantRequest registerRestaurantRequest) {
        System.out.println(registerRestaurantRequest);
        return ResponseEntity.ok(registerRestaurant.addNewRequest(registerRestaurantRequest));
    }
}
