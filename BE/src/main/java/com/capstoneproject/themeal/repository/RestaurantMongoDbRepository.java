package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.RestaurantMongoDB;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantMongoDbRepository extends MongoRepository<RestaurantMongoDB, Long> {
}
