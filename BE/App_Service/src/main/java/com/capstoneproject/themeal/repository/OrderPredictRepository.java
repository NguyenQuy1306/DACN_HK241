package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.OrderPredict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderPredictRepository extends JpaRepository<OrderPredict, Long> {
    @Query("SELECT DISTINCT f FROM OrderPredict f " +
            "WHERE f.orderId = :orderId AND f.userId= :userId")
    public Optional<OrderPredict> findOrder(Long userId, Long orderId);
}
