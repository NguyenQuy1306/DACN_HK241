package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.OverbookingSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OverbookingSettingsRepository extends JpaRepository<OverbookingSettings, Long> {
    @Query("SELECT DISTINCT o FROM OverbookingSettings o WHERE o.restaurant.MaSoNhaHang = :restaurantId")
    OverbookingSettings findByRestaurantId(@Param("restaurantId") Long restaurantId);
}
