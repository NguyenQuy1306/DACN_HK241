package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.request.BehaviorRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.service.impl.RedisStreamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/behavior")
public class BehaviorController {

    @Autowired
    private RedisStreamServiceImpl redisStreamService;
    @PostMapping
    public ResponseEntity<ApiResponse<String>> receiveBehavior(@RequestBody BehaviorRequest behaviorRequest) {
        ApiResponse<String> apiResponse = new ApiResponse<String>();
        redisStreamService.pushBehaviorToStream(
                behaviorRequest.getUserId(),
                behaviorRequest.getRestaurantId(),
                behaviorRequest.getTimeSpent(),
                behaviorRequest.isLiked()
        );
        apiResponse.ok("Behavior pushed to Redis stream");
        return ResponseEntity.ok(apiResponse);
    }
}
