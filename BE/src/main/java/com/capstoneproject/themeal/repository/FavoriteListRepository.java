package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.FavoriteList;

import java.util.List;

@Repository
public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {
    @Query("SELECT l FROM FavoriteList l WHERE l.khachHang.maSoNguoiDung =:customerId")
    List<FavoriteList> findByMaSoKhachHang(@Param("customerId") Long customerId);
}
