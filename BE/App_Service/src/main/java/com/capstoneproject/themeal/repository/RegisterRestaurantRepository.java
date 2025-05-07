package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.RegisterRestaurant;

@Repository
public interface RegisterRestaurantRepository extends JpaRepository<RegisterRestaurant, Long> {

}
