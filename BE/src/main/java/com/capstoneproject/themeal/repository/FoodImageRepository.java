package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.FoodImage;

@Repository
public interface FoodImageRepository extends JpaRepository<FoodImage, Long> {

}
