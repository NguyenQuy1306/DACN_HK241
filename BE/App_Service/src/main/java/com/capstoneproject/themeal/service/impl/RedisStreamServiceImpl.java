package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.service.RedisStreamService;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StreamOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@Service
public class RedisStreamServiceImpl implements RedisStreamService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String streamKey = "user_behavior";

    @Override
    public void pushBehaviorToStream(String userId, String restaurantId, int timeSpent, boolean liked) {
        StreamOperations<String, Object, Object> streamOps = redisTemplate.opsForStream();

        Map<String, Object> behavior = new HashMap<>();
        behavior.put("userId", userId);
        behavior.put("restaurantId", restaurantId);
        behavior.put("timeSpent", timeSpent);
        behavior.put("liked", liked);
        streamOps.add(MapRecord.create(streamKey, behavior));
    }
}
