package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.UserBehaviorLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserBehaviorLogRepository extends MongoRepository<UserBehaviorLog, Long> {
}
