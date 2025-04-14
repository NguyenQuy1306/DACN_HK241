package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Food;

import org.springframework.data.jpa.repository.Query;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    @Query("SELECT DISTINCT f FROM Food f " +
            "JOIN f.DanhMuc danhmuc " + "JOIN danhmuc.NhaHang nhahang " +
            "WHERE nhahang.MaSoNhaHang = :restaurantId ")
    List<Food> findAllFood(@Param("restaurantId") Long restaurantId, Pageable pageable);

    @Query("SELECT f.MaSoMonAn FROM Food f WHERE f.MaSoMonAn IN :ids")
    List<Long> findExistingFoodIds(List<Long> ids);

    @Query("SELECT f FROM Food f WHERE LOWER(f.Ten) LIKE LOWER(CONCAT('%',:key,'%')) AND f.DanhMuc.NhaHang.MaSoNhaHang =:restaurantId")
    List<Food> searchByKeyWord(@Param("key") String key, @Param("restaurantId") Long restaurantId, Pageable pageable);

    @Query("SELECT f FROM Food f WHERE f.DanhMuc.MaSoDanhMuc =:categoryId AND f.DanhMuc.NhaHang.MaSoNhaHang =:restaurantId")
    List<Food> searchByCategoryId(@Param("categoryId") Long categoryId, @Param("restaurantId") Long restaurantId,
            Pageable pageable);

}
