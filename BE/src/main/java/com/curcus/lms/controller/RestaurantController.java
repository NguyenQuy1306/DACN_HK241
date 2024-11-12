package com.curcus.lms.controller;
// nguyene

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.repository.RestaurantRepository;
import com.curcus.lms.service.RestaurantService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.exception.NotFoundException;
import com.curcus.lms.exception.ValidationException;
import org.springframework.data.domain.Pageable;

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

    @GetMapping("/recommended")

    public List<RestaurantInMapsResponse> getRecommendedList() {
        return restaurantService.getRecommendedList();
    }

    @GetMapping("/list-in-boundary")
    public ResponseEntity<ApiResponse<List<RestaurantInMapsResponse>>> getRestaurantsInMaps(
            @RequestParam Double bl_latitude,
            @RequestParam Double bl_longitude,
            @RequestParam Double tr_latitude,
            @RequestParam Double tr_longitude) {

        ApiResponse<List<RestaurantInMapsResponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30

        try {
            List<RestaurantInMapsResponse> restaurantInMapsResponses = restaurantService.getRestaurantsInMaps(
                    bl_latitude,
                    bl_longitude, tr_latitude, tr_longitude, pageable);
            apiResponse.ok(restaurantInMapsResponses);
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

    // @GetMapping("")
    // public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getRestaurants()
    // {
    // ApiResponse<List<RestaurantResponse>> apiResponse = new ApiResponse<>();

    // try {
    // List<RestaurantResponse> restaurantResponses =
    // restaurantService.getRestaurants();
    // apiResponse.ok(restaurantResponses);
    // } catch (NotFoundException e) {
    // apiResponse.error(ResponseCode.getError(10));
    // return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    // } catch (ValidationException e) {
    // apiResponse.error(ResponseCode.getError(1));
    // return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    // } catch (Exception e) {
    // apiResponse.error(ResponseCode.getError(23));
    // return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    // }

    public RestaurantResponse getRestaurant(@RequestBody Restaurant restaurantRequest) {
        RestaurantResponse restaurantResponse = new RestaurantResponse();
        restaurantRepository.save(restaurantRequest);
        return restaurantResponse;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> handleFileUpload(@RequestPart MultipartFile file) {
        // handle the file
        return ResponseEntity.ok("File uploaded successfully");
    }
}