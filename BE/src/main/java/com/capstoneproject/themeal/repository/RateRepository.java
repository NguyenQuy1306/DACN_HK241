package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Rate;

import java.util.Set;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
    @Query("SELECT r FROM Rate r WHERE r.NguoiDung.maSoNguoiDung =:customerId")
    Set<Rate> findByCustomerId(@Param("customerId") Long customerId);
}
