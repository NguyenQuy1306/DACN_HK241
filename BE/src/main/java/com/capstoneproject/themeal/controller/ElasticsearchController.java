package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.entity.RestaurantElasticsearch;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.repository.ElasticSearchQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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
        System.out.println("nguyênnnnnn2");
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
}
