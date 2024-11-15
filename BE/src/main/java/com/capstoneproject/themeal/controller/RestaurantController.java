package com.capstoneproject.themeal.controller;
// nguyene

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.service.RestaurantService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.data.domain.Pageable;
import javax.servlet.http.HttpSession;

import java.util.List;

@RestController
@RequestMapping("api/restaurants")
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