package com.curcus.lms.controller;


import com.curcus.lms.model.response.RateResponse;
import com.curcus.lms.service.impl.RateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
