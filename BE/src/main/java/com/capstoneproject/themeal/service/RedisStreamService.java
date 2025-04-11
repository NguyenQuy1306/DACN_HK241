package com.capstoneproject.themeal.service;

import java.util.Map;

public interface RedisStreamService {
    void pushBehaviorToStream(String userId, String restaurantId, int timeSpent, boolean liked);
}
