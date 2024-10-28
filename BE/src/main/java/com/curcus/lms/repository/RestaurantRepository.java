package com.curcus.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.entity.RestaurantImageType;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
        @Query("SELECT DISTINCT r FROM Restaurant r " +
                        "JOIN r.danhSachAnhNhaHang ra " +
                        "WHERE ra.KieuAnh = :restaurantImageType " +
                        "AND r.ViDo BETWEEN :blLat AND :trLat " +
                        "AND r.KinhDo BETWEEN :blLng AND :trLng")
        List<Restaurant> findRestaurantsInBoundary(
                        @Param("blLat") double blLat,
                        @Param("blLng") double blLng,
                        @Param("trLat") double trLat,
                        @Param("trLng") double trLng,
                        @Param("restaurantImageType") RestaurantImageType restaurantImageType,
                        Pageable pageable);
}
