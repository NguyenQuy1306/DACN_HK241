package com.curcus.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.curcus.lms.model.entity.ComboAvailable;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface ComboAvailableRepository extends JpaRepository<ComboAvailable, Long> {
    @Query("SELECT DISTINCT c FROM ComboAvailable c " +
            "JOIN c.NhaHang nhahang " +
            "WHERE nhahang.MaSoNhaHang = :restaurantId ")
    List<ComboAvailable> findAllComboAvailable(@Param("restaurantId") Long restaurantId, Pageable pageable);
}
