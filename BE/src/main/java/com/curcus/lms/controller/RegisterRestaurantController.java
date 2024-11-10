package com.curcus.lms.controller;


import com.curcus.lms.model.mapper.RegisterRestaurantMapper;
import com.curcus.lms.model.request.RegisterRestaurantRequest;
import com.curcus.lms.model.response.RegisterRestaurantResponse;
import com.curcus.lms.service.impl.RegisterRestaurantImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/register-restaurant")
@CrossOrigin("*")
public class RegisterRestaurantController {
    @Autowired
    RegisterRestaurantImpl registerRestaurant;

    @PostMapping
    ResponseEntity<RegisterRestaurantResponse> addNewRegisterRequest(@RequestBody RegisterRestaurantRequest registerRestaurantRequest) {
        System.out.println(registerRestaurantRequest);
        return ResponseEntity.ok(registerRestaurant.addNewRequest(registerRestaurantRequest));
    }
}
