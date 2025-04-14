package com.capstoneproject.themeal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Deposit;
import com.capstoneproject.themeal.model.entity.DepositId;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, DepositId> {

    @Query("SELECT d FROM Deposit d WHERE d.NhaHang.MaSoNhaHang = :restaurantId")
    Deposit findDepositByRestaurantId(@Param("restaurantId") Long restaurantId);
}
