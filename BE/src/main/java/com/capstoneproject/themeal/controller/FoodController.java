package com.capstoneproject.themeal.controller;
// nguyene

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("api/food")
public class FoodController {
    @Autowired
    private S3Service s3Service;
    @Autowired
    private FoodService foodService;

    @Value("${aws.s3.bucket}")
    private String bucketName;

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

    @PostMapping(value = "/restaurants/{restaurantId}/categories/{categoryId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> createNewFood(
            @PathVariable Long restaurantId,
            @PathVariable Long categoryId,
            @RequestPart("foodRequest") String foodRequestJson, // Nhận dưới dạng String JSON
            @RequestPart("file") MultipartFile file) { // Dùng @RequestPart thay vì @RequestParam

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