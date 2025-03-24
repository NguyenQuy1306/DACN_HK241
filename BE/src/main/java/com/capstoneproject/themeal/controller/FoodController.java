package com.capstoneproject.themeal.controller;
// nguyene

import com.capstoneproject.themeal.model.mapper.FoodMapper;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.FoodRepository;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.S3Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/food")
public class FoodController {
    @Autowired
    private S3Service s3Service;
    @Autowired
    private FoodService foodService;

    @Value("${aws.s3.bucket}")
    private String bucketName;
    @Autowired
    private FoodMapper foodMapper;
    @Autowired
    private FoodRepository foodRepository;

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

    @GetMapping("/{foodId}")
    public ResponseEntity<ApiResponse<FoodResponse>> getFoodById(@RequestParam Long restaurantId, @PathVariable Long foodId) {

        ApiResponse<FoodResponse> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30
        try {
            FoodResponse foodResponses = foodService.getFoodById(pageable, restaurantId, foodId);
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

    @GetMapping("/category")
    public ResponseEntity<ApiResponse<List<FoodFinalReponse>>> getFoodByCategory(@RequestParam Long restaurantId, @RequestParam Long categoryId) {

        ApiResponse<List<FoodFinalReponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30
        try {
            List<FoodFinalReponse> foodResponses = foodService.getFoodByCategoryId(pageable, restaurantId, categoryId);
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

    @PostMapping(value = "/duplicate")
    public ResponseEntity<ApiResponse<List<FoodFinalReponse>>> duplicateFood(@RequestParam Long restaurantId, @RequestParam Long foodId) {

        ApiResponse<List<FoodFinalReponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30
        try {
            List<FoodFinalReponse> foodResponses = foodService.duplicateFood(restaurantId,foodId,pageable);
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

    @GetMapping(value = "/search")
    public ResponseEntity<ApiResponse<List<FoodFinalReponse>>> searchFood(@RequestParam Long restaurantId, @RequestParam String key) {

        ApiResponse<List<FoodFinalReponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30
        try {
            List<FoodFinalReponse> foodResponses = foodService.searchFood(key,restaurantId,pageable);
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

    @DeleteMapping("")
    public ResponseEntity<ApiResponse<List<FoodFinalReponse>>> deleteFood(@RequestParam Long foodId, @RequestParam Long restaurantId) {

        ApiResponse<List<FoodFinalReponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30
        try {
            List<FoodFinalReponse> foodResponses = foodService.deleteFood(restaurantId, foodId, pageable);
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

    @PostMapping(value = "/restaurants/{restaurantId}/categories/{categoryId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> createNewFood(
            @PathVariable Long restaurantId,
            @PathVariable Long categoryId,
            @RequestPart("foodRequest") String foodRequestJson, // Nhận dưới dạng String JSON
            @RequestPart(value = "file", required = false) MultipartFile file) { // Dùng @RequestPart thay vì
                                                                                 // @RequestParam
        System.out.println("file check" + file);
        ApiResponse<String> apiResponse = new ApiResponse<>();

        try {
            // Chuyển đổi JSON thành object
            ObjectMapper objectMapper = new ObjectMapper();
            System.out.println("foodRequestJson" + foodRequestJson);
            FoodRequest foodRequest = objectMapper.readValue(foodRequestJson, FoodRequest.class);
            System.out.println("foodRequest" + foodRequestJson);

            Food food = foodService.createNewFood(foodRequest, restaurantId, categoryId);
            foodService.upLoadImageRestaurant(restaurantId, categoryId, food.getMaSoMonAn(), file);

            apiResponse.ok("Upload new food successfully");
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

    @PostMapping(value = "/restaurants/{restaurantId}/categories/{categoryId}/foods/{foodId}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadImageRestaurant(@PathVariable Long foodId, @PathVariable Long restaurantId,
            @PathVariable Long categoryId, @RequestParam("file") MultipartFile file) {
        foodService.upLoadImageRestaurant(restaurantId, categoryId, foodId, file);

    }

    @PostMapping(value = "/update")
    public ResponseEntity<ApiResponse<List<FoodFinalReponse>>> updateFood(@RequestBody FoodUpdateRequest foodUpdateRequest) {
        ApiResponse<List<FoodFinalReponse>> apiResponse = new ApiResponse<>();
        Optional<Food> currentFood = foodService.isFoodExist(foodUpdateRequest.getId());
        if (currentFood.isEmpty()) {
            throw new NotFoundException("Food not found");
        } else {
            currentFood.get().setTen(foodUpdateRequest.getName());
            currentFood.get().setGia(foodUpdateRequest.getPrice());
            currentFood.get().setMoTa(foodUpdateRequest.getDescription());
            foodRepository.save(currentFood.get());
            apiResponse.ok(foodMapper.toFoodFinalResponse(List.of(currentFood.get())));
        }
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping(value = "/test-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> testUpload(@RequestParam("file") MultipartFile file) {
        try {
            // Use the exact same bucket name that worked in CLI
            s3Service.putObject("quy1234",
                    "foo",
                    file.getBytes());

            return ResponseEntity.ok("Upload successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

}