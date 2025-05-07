package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;

import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
        @Query("SELECT DISTINCT r FROM Restaurant r " +
                        "JOIN r.DanhSachAnhNhaHang ra " +
                        "WHERE ra.KieuAnh = :restaurantImageType " +
                        "AND r.ViDo BETWEEN :blLat AND :trLat " +
                        "AND r.KinhDo BETWEEN :blLng AND :trLng " +
                        "AND r.ThanhPho=:thanhPho")
        Page<Restaurant> findRestaurantsInBoundary(
                        @Param("blLat") double blLat,
                        @Param("blLng") double blLng,
                        @Param("trLat") double trLat,
                        @Param("trLng") double trLng,
                        @Param("restaurantImageType") RestaurantImageType restaurantImageType,
                        @Param("thanhPho") String thanhPho,
                        Pageable pageable);

        @Query("SELECT DISTINCT r FROM Restaurant r " +
                        "JOIN r.DanhSachAnhNhaHang ra " +
                        "JOIN r.DanhSachBan ban " +
                        "WHERE ra.KieuAnh = :restaurantImageType " +
                        "AND r.ViDo BETWEEN :blLat AND :trLat " +
                        "AND r.KinhDo BETWEEN :blLng AND :trLng " +
                        "AND r.ThanhPho=:thanhPho" +
                        " AND ban.Ngay = :date AND ban.Gio = :time AND ban.SoNguoi = :people")
        Page<Restaurant> findRestaurantsInBoundaryWithTable(
                        @Param("blLat") double blLat,
                        @Param("blLng") double blLng,
                        @Param("trLat") double trLat,
                        @Param("trLng") double trLng,
                        @Param("restaurantImageType") RestaurantImageType restaurantImageType,
                        @Param("date") LocalDate date,
                        @Param("time") LocalTime time,
                        @Param("people") Byte people,
                        @Param("thanhPho") String thanhPho,
                        Pageable pageable);

        @Query("SELECT DISTINCT r FROM Restaurant r " +
                        "JOIN r.ChuNhaHang chuNhaHang " +

                        "WHERE chuNhaHang.MaSoNguoiDung = :ownerId ")
        Restaurant findRestaurantByOwner(@Param("ownerId") double ownerId);

}
