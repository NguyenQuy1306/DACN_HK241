package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFood;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFoodId;

import org.springframework.data.jpa.repository.Query;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface ComboAvailableHasFoodRepository extends JpaRepository<ComboAvailableHasFood, ComboAvailableHasFoodId> {
    @Query("SELECT DISTINCT c FROM ComboAvailableHasFood c " +
            "JOIN c.ComboCoSan comboCoSan " + "JOIN comboCoSan.NhaHang nhahang " +
            "WHERE nhahang.MaSoNhaHang = :restaurantId ")
    List<ComboAvailableHasFood> findAllComboAvailable(@Param("restaurantId") Long restaurantId, Pageable pageable);
}
