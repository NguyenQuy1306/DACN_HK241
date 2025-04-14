package com.capstoneproject.themeal.controller;
// nguyene

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.FoodRepository;
import com.capstoneproject.themeal.service.FoodService;
import com.capstoneproject.themeal.service.TableAvailableService;
import com.capstoneproject.themeal.util.TableAvailableSorter;

import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/table")
public class TableAvailableController {

    @Autowired
    private TableAvailableService tableAvailableService;

    public void createTableAvailable(TableAvailable tableAvailable) {
        tableAvailableService.saveWithGeneratedThuTuBan(tableAvailable);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getTableForRestaurant(
            @RequestParam Long restaurantId) {

        ApiResponse<List<Map<String, Object>>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30

        try {
            List<Map<String, Object>> tableAvailableResponses = tableAvailableService
                    .getTableAvailableForRestaurant(restaurantId);
            TableAvailableSorter tableAvailableSorter = new TableAvailableSorter();
            tableAvailableSorter.sortTableAvailableList(tableAvailableResponses);
            apiResponse.ok(tableAvailableResponses);
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


    @PostMapping("/restaurant")
    public ResponseEntity<ApiResponse<?>> createTableForRestaurant(
            @RequestBody List<TableRequest> tableRequests, @RequestParam Long restaurantId) {

        ApiResponse<List<Map<String, Object>>> apiResponse = new ApiResponse<>();

        try {
            tableAvailableService.saveTableAvailableForRestaurant(tableRequests, restaurantId);
            apiResponse.ok();
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
    public ResponseEntity<ApiResponse<?>> deleteTable(@RequestParam Long restaurantId,
                                                      @RequestParam Short thuTuBan) {
        ApiResponse apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(0, 30); // Trang 0, kích thước 30
        try {
            tableAvailableService.deleteTable(restaurantId, thuTuBan);
            apiResponse.ok();
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

    @PutMapping("")
    public ResponseEntity<ApiResponse<?>> updateCountOfTable(@RequestParam Long restaurantId,
                                                             @RequestParam Short thuTuBan) {
        ApiResponse apiResponse = new ApiResponse<>();
        try {
            tableAvailableService.updateCountOfTable(restaurantId, thuTuBan);
            apiResponse.ok();
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