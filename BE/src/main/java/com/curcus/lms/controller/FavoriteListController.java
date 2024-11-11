package com.curcus.lms.controller;


import com.curcus.lms.model.response.FavoriteListResponse;
import com.curcus.lms.service.FavoriteListService;
import com.curcus.lms.service.impl.FavoriteListServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
