package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstoneproject.themeal.model.entity.FavoriteListRestaurant;
import com.capstoneproject.themeal.model.entity.FavoriteListRestaurantId;

import java.util.List;

public interface FavoriteListRestaurantRepository
        extends JpaRepository<FavoriteListRestaurant, FavoriteListRestaurantId> {
    @Query("SELECT r FROM FavoriteListRestaurant r WHERE r.DanhSachYeuThich.MaSoDanhSachYeuThich =:favoriteListId")
    List<FavoriteListRestaurant> findByFavoriteListId(@Param("favoriteListId") Long favoriteListId);
}
