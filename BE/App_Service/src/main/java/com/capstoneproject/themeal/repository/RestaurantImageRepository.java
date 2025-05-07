package com.capstoneproject.themeal.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.entity.RestaurantImage;

import jakarta.transaction.Transactional;

@Repository
public interface RestaurantImageRepository extends JpaRepository<RestaurantImage, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM RestaurantImage r WHERE r.URL = :toDeleteUrl")
    void deleteByUrl(@Param("toDeleteUrl") String toDeleteUrl);

    @Query("SELECT DISTINCT r  FROM RestaurantImage r WHERE r.URL = :toDeleteUrl")
    RestaurantImage findByUrl(@Param("toDeleteUrl") String toDeleteUrl);
}
