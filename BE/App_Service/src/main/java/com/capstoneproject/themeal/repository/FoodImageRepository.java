package com.capstoneproject.themeal.repository;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.FoodImage;

import java.util.List;

@Repository
public interface FoodImageRepository extends JpaRepository<FoodImage, Long> {
    @Query("SELECT i FROM FoodImage i WHERE i.NhaHang.MaSoNhaHang = :restaurantId AND i.food.MaSoMonAn = :foodId")
    List<FoodImage> findByRestaurantAndFoodId(@Param("restaurantId") Long restaurantId, @Param("foodId") Long foodId);
    @Transactional
    @Modifying
    @Query("DELETE FROM FoodImage i WHERE i.NhaHang.MaSoNhaHang = :restaurantId AND i.food.MaSoMonAn = :foodId AND i.URL = :url")
    void deleteFoodImage (@Param("restaurantId") Long restaurantId, @Param("foodId") Long foodId, @Param("url") String url);
}
