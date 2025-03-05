package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.RestaurantElasticsearch;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.model.response.RestaurantInMapsResponse;
import com.capstoneproject.themeal.repository.ElasticSearchQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/elas")
public class ElasticsearchController {
    @Autowired
    private ElasticSearchQuery elasticSearchQuery;

    @PostMapping("/createOrUpdateDocument")
    public ResponseEntity<ApiResponse<Object>> createOrUpdateDocument(
            @RequestBody RestaurantElasticsearch restaurantElasticsearch) throws IOException {
        ApiResponse<Object> objectApiResponse = new ApiResponse<>();
        String response = elasticSearchQuery.createOrUpdateDocument(restaurantElasticsearch);
        objectApiResponse.ok(response);
        return new ResponseEntity<>(objectApiResponse, HttpStatus.OK);
    }

    @GetMapping("/getDocument")
    public ResponseEntity<ApiResponse<RestaurantElasticsearch>> getDocumentById(
            @RequestParam String restaurantId) throws

    IOException {
        RestaurantElasticsearch restaurantElasticsearch = elasticSearchQuery.getDocumentById(restaurantId);
        ApiResponse<RestaurantElasticsearch> apiResponse = new ApiResponse<>();
        apiResponse.ok(restaurantElasticsearch);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("/deleteDocument")
    public ResponseEntity<ApiResponse<Object>> deleteDocumentById(@RequestParam String restaurantId)
            throws IOException {
        ApiResponse<Object> apiResponse = new ApiResponse<>();
        String response = elasticSearchQuery.deleteDocumentById(restaurantId);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/searchDocument")
    public ResponseEntity<ApiResponse<List<RestaurantElasticsearch>>> searchAlldocument() throws IOException {
        ApiResponse<List<RestaurantElasticsearch>> apiResponse = new ApiResponse<>();
        List<RestaurantElasticsearch> restaurantElasticsearchList = elasticSearchQuery.searchALlDocuments();
        apiResponse.ok(restaurantElasticsearchList);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/searchByKeyword")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> searchByKeyword(@RequestParam String param)
            throws IOException {
        ApiResponse<List<Map<String, Object>>> apiResponse = new ApiResponse<>();
        List<Map<String, Object>> restaurantElasticsearchs = elasticSearchQuery.searchByKeyword(param);
        apiResponse.ok(restaurantElasticsearchs);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/searchWithKeyword")
    public ResponseEntity<ApiResponse<List<RestaurantInMapsResponse>>> getMethodName(@RequestParam String param,
            @RequestParam Double lon, @RequestParam Double lat) {
        ApiResponse<List<RestaurantInMapsResponse>> apiResponse = new ApiResponse<>();

        try {
            List<RestaurantInMapsResponse> restaurantInMapsResponses = elasticSearchQuery.searchWithKeyword(param, lat,
                    lon);
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

}
