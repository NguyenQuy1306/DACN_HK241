package com.capstoneproject.themeal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.capstoneproject.themeal.model.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT DISTINCT c FROM Category c JOIN c.NhaHang nh WHERE nh.MaSoNhaHang = :restaurantId")
    List<Category> getCategories(@Param("restaurantId") Long restaurantId);
}
