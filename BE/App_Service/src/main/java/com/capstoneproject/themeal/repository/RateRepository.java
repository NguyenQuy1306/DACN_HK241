package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.entity.RestaurantImageType;
import com.capstoneproject.themeal.model.response.UserRateResponse;

import java.util.List;
import java.util.Set;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
        @Query("SELECT r FROM Rate r JOIN r.NguoiDung c WHERE c.MaSoNguoiDung =:customerId")
        Set<Rate> findByCustomerId(@Param("customerId") Long customerId);

        @Query("SELECT r FROM Rate r  JOIN r.NhaHang d WHERE d.MaSoNhaHang =:restaurantId ")
        List<Rate> getRatesByRestaurantId(@Param("restaurantId") Long restaurantId);

        @Query("SELECT new com.capstoneproject.themeal.model.response.UserRateResponse(" +
                        "r.NguoiDung.MaSoNguoiDung, r.NguoiDung.HoTen, COUNT(r)) " +
                        "FROM Rate r " +
                        "JOIN r.NhaHang c " +
                        "JOIN r.NguoiDung d " +
                        "WHERE c.MaSoNhaHang = :restaurantId " +
                        "GROUP BY d.MaSoNguoiDung, r.NguoiDung.HoTen")
        List<UserRateResponse> getUserRateById(@Param("restaurantId") Long restaurantId);

}
