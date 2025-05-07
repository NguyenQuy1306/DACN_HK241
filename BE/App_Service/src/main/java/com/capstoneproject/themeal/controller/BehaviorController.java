package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.request.BehaviorRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.service.KafkaProducerService;
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
    private KafkaProducerService kafkaProducerService;

    private static final String BEHAVIOR_TOPIC = "user-behavior-topic";
    @PostMapping
    public ResponseEntity<ApiResponse<String>> receiveBehavior(@RequestBody BehaviorRequest behaviorRequest) {
        System.out.println("///////////////////==BEHAVIOR OF USER===////////////////////////: "+behaviorRequest);
        ApiResponse<String> apiResponse = new ApiResponse<String>();
        kafkaProducerService.sendUserBehavior(BEHAVIOR_TOPIC, behaviorRequest);
        apiResponse.ok("✅ Behavior sent to Kafka topic");
        return ResponseEntity.ok(apiResponse);
    }
}
