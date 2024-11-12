package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.model.response.FavoriteListResponse;
import com.capstoneproject.themeal.service.FavoriteListService;
import com.capstoneproject.themeal.service.impl.FavoriteListServiceImpl;

import java.util.List;

@RestController
@RequestMapping("api/favorite-list")
@CrossOrigin("*")
public class FavoriteListController {
    @Autowired
    FavoriteListServiceImpl favoriteListService;

    @GetMapping("/{customerId}")
    ResponseEntity<List<FavoriteListResponse>> findFavoriteListByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(favoriteListService.findFavoriteListByCustomerId(customerId));
    }
}
