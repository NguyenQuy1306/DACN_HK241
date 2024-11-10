package com.curcus.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.curcus.lms.model.entity.Food;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    @Query("SELECT DISTINCT f FROM Food f " +
            "JOIN f.DanhMuc danhmuc " + "JOIN danhmuc.NhaHang nhahang " +
            "WHERE nhahang.MaSoNhaHang = :restaurantId ")
    List<Food> findAllFood(@Param("restaurantId") Long restaurantId, Pageable pageable);
}
