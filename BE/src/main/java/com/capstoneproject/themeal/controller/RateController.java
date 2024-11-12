package com.capstoneproject.themeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.model.response.RateResponse;
import com.capstoneproject.themeal.service.impl.RateServiceImpl;

import java.util.Set;

@RestController
@RequestMapping("api/rate")
@CrossOrigin("*")
public class RateController {
    @Autowired
    RateServiceImpl rateService;

    @GetMapping("/{customerId}")
    public ResponseEntity<Set<RateResponse>> getListByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(rateService.findByCustomerId(customerId));
    }
}
