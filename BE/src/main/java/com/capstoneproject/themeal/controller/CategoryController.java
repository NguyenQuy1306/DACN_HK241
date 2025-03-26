package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.request.CategoryRequest;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.CategoryResponse;
import com.capstoneproject.themeal.model.response.RatesRestaurantResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.service.CategoryService;

import java.util.List;

import org.apache.kafka.clients.admin.internals.ApiRequestScope;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategoryByRestaurantId(
            @RequestParam Long restaurantId) {
        ApiResponse<List<CategoryResponse>> apiResponse = new ApiResponse<>();
        System.out.println("called getAllCategoryByRestaurantId");
        try {
            List<CategoryResponse> lCategories = categoryService.getAllCategoryByRestaurantId(
                    restaurantId);
            apiResponse.ok(lCategories);
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
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> searchCategory(@RequestParam String keyword, @RequestParam Long restaurantId) {
        ApiResponse<List<CategoryResponse>> apiResponse = new ApiResponse<>();

        apiResponse.ok(categoryService.searchCategory(restaurantId, keyword));

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);

    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> addCategory(@RequestParam Long restaurantId) {
        ApiResponse<List<CategoryResponse>> apiResponse = new ApiResponse<>();
        List<CategoryResponse> categoryResponses = categoryService.addNewCategory(restaurantId);
        apiResponse.ok(categoryResponses);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> deleteCategory(@RequestParam Long restaurantId, @RequestParam Long categoryId) {
        ApiResponse<List<CategoryResponse>> apiResponse = new ApiResponse<>();
        List<CategoryResponse> categoryResponses = categoryService.deleteCategory(restaurantId, categoryId);
        apiResponse.ok(categoryResponses);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping(value = "/update")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> updateCategory(@RequestParam Long categoryId,@RequestBody CategoryRequest categoryRequest) {
        ApiResponse<List<CategoryResponse>> apiResponse = new ApiResponse<>();
        List<CategoryResponse> categoryResponses = categoryService.updateCategory(categoryId, categoryRequest);
        apiResponse.ok(categoryResponses);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
