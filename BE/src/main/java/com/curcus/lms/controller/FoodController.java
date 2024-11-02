package com.curcus.lms.controller;
// nguyene

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.repository.FoodRepository;
import com.curcus.lms.service.FoodService;

import org.springframework.web.bind.annotation.GetMapping;
import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.exception.NotFoundException;
import com.curcus.lms.exception.ValidationException;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("api/food")
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<FoodFinalReponse>>> getFood(@RequestParam Long restaurantId) {

        ApiResponse<List<FoodFinalReponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30

        try {
            List<FoodFinalReponse> foodResponses = foodService.getAllFood(pageable, restaurantId);
            apiResponse.ok(foodResponses);
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