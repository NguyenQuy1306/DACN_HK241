package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.ComboAvailableHasFoodResponse;
import com.capstoneproject.themeal.model.response.RateResponse;
import com.capstoneproject.themeal.model.response.RatesRestaurantResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.service.RateService;
import com.capstoneproject.themeal.service.impl.RateServiceImpl;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/rate")

public class RateController {
    @Autowired
    private RateService rateService;

    @GetMapping("/{customerId}/")
    public ResponseEntity<Set<RateResponse>> getListByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(rateService.findByCustomerId(customerId));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<ApiResponse<List<RatesRestaurantResponse>>> getRatesInRestaurant(
            @PathVariable Long restaurantId) {

        ApiResponse<List<RatesRestaurantResponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30

        try {
            List<RatesRestaurantResponse> ratesRestaurantResponses = rateService.getRatesInRestaurant(
                    restaurantId);
            apiResponse.ok(ratesRestaurantResponses);
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

}
