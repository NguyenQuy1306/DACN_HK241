package com.capstoneproject.themeal.controller;
// nguyene

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.capstoneproject.themeal.config.ApplicationConfig;
import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.service.RestaurantService;
import com.capstoneproject.themeal.service.S3Service;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.data.domain.Page;
import javax.servlet.http.HttpSession;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/restaurants")
public class RestaurantController {

    private final ApplicationConfig applicationConfig;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private S3Service s3Service;

    RestaurantController(ApplicationConfig applicationConfig) {
        this.applicationConfig = applicationConfig;
    }

    @PostMapping("")
    public RestaurantResponse createRestaurant(@RequestBody Restaurant restaurantRequest) {
        RestaurantResponse restaurantResponse = new RestaurantResponse();
        restaurantRepository.save(restaurantRequest);
        return restaurantResponse;
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<RestaurantInMapsResponse>>> getAllRestaurants() {
        ApiResponse<List<RestaurantInMapsResponse>> apiResponse = new ApiResponse<>();
        try {
            List<RestaurantInMapsResponse> restaurants = restaurantService.getAll();
            apiResponse.ok(restaurants);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RestaurantInMapsResponse>> getAllRestaurantById(@PathVariable("id") Long id) {
        ApiResponse<RestaurantInMapsResponse> apiResponse = new ApiResponse<>();
        try {
            RestaurantInMapsResponse restaurant = restaurantService.getRestaurantById(id);
            apiResponse.ok(restaurant);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
            @RequestParam Double tr_longitude, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalDate date,
            @RequestParam(required = false) Byte people, @RequestParam(required = false) String thanhPho) {

        ApiResponse<List<RestaurantInMapsResponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(page, size);

        try {
            Page<RestaurantInMapsResponse> restaurantInMapsResponses = restaurantService.getRestaurantsInMaps(
                    bl_latitude,
                    bl_longitude, tr_latitude, tr_longitude, time, date, people, thanhPho, pageable);
            MetadataResponse metadata = new MetadataResponse(
                    restaurantInMapsResponses.getTotalElements(),
                    restaurantInMapsResponses.getTotalPages(),
                    restaurantInMapsResponses.getNumber(),
                    restaurantInMapsResponses.getSize(),
                    (restaurantInMapsResponses.hasNext()
                            ? "/api/restaurants/list-in-boundary?page=" + (restaurantInMapsResponses.getNumber() +
                                    1)
                            : null),
                    (restaurantInMapsResponses.hasPrevious() ? "/api/restaurants/list-in-boundary?page=" +
                            (restaurantInMapsResponses.getNumber() - 1) : null),
                    "/api/restaurants/list-in-boundary?page=" + (restaurantInMapsResponses.getTotalPages() - 1),
                    "/api/restaurants/list-in-boundary?page=0");
            Map<String, Object> responseMetadata = new HashMap<>();

            responseMetadata.put("pagination", metadata);
            apiResponse.ok(restaurantInMapsResponses.getContent(), responseMetadata);
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

    @GetMapping("")
    public ResponseEntity<ApiResponse<RestaurantInMapsResponse>> getRestaurant(
            @RequestParam(required = false) Long ownerId) {

        ApiResponse<RestaurantInMapsResponse> apiResponse = new ApiResponse<>();

        try {
            RestaurantInMapsResponse restaurantsResponses = restaurantService.getRestaurant(ownerId);
            apiResponse.ok(restaurantsResponses);
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

    @GetMapping("/presigned-url")
    public ResponseEntity<String> getPresignedUrl(@RequestParam String key) {
        String url = s3Service.generatePresignedUrl("themealbucket1", key);
        return ResponseEntity.ok(url);
    }

    @PutMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> updateRestaurant(
            @RequestParam(value = "maSoNhaHang", required = false) Long maSoNhaHang,
            @RequestParam(value = "fields", required = false) String fields,
            @RequestParam(value = "imageUrls", required = false) List<String> imageUrls,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages) {
        // TODO: process PUT request
        ApiResponse apiResponse = new ApiResponse<>();
        try {

            // Tạo danh sách ảnh bị xoá
            // Xoá trong s3 các ảnh bị xoá
            // upload ảnh mới lên s3 và tạo url mới
            // thêm các thực thể RestaurantImage vào bảng.
            Restaurant restaurant = restaurantRepository.findById(maSoNhaHang)
                    .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
            System.out.println("chjeccc");
            if (imageUrls != null) {
                System.out.println("chjeccc23");
                restaurantService.findImagesToDelete(imageUrls, restaurant);
            }
            if (newImages != null) {

                restaurantService.addNewRestaurantImages(newImages, maSoNhaHang,
                        "themealbucket1", restaurant);
            }
            apiResponse.ok("Restaurant updated successfully!");
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.ok("Restaurant updated unsuccessfully!");
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(value = "/test-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> testUpload(@RequestParam("file") MultipartFile file) {
        try {
            // Use the exact same bucket name that worked in CLI
            s3Service.putObject("themealbucket1",
                    "restaurants/1/restaurantImage/1234.png",
                    file.getBytes());

            return ResponseEntity.ok("Upload successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}