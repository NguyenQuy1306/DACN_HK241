package com.curcus.lms.controller;
// nguyene

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.repository.RestaurantRepository;
import com.curcus.lms.service.RestaurantService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.exception.NotFoundException;
import com.curcus.lms.exception.ValidationException;

import java.util.List;

@RestController
@RequestMapping("api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("")
    public RestaurantResponse createRestaurant(@RequestBody Restaurant restaurantRequest) {
        RestaurantResponse restaurantResponse = new RestaurantResponse();
        restaurantRepository.save(restaurantRequest);
        return restaurantResponse;
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getRestaurants() {
        ApiResponse<List<RestaurantResponse>> apiResponse = new ApiResponse<>();

        try {
            List<RestaurantResponse> restaurantResponses = restaurantService.getRestaurants();
            apiResponse.ok(restaurantResponses);
        } catch (NotFoundException e) {
            apiResponse.error(ResponseCode.getError(10));
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        } catch (ValidationException e) {
            apiResponse.error(ResponseCode.getError(1));
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    public RestaurantResponse getRestaurant(@RequestBody Restaurant restaurantRequest) {
        RestaurantResponse restaurantResponse = new RestaurantResponse();
        restaurantRepository.save(restaurantRequest);
        return restaurantResponse;
    }
}