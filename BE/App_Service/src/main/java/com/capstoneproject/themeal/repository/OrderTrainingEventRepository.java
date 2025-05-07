package com.capstoneproject.themeal.repository;


import com.capstoneproject.themeal.model.entity.OrderTrainingEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderTrainingEventRepository extends MongoRepository<OrderTrainingEvent, Long> {
}

