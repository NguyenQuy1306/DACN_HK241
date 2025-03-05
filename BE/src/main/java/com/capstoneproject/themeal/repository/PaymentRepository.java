package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Payment;
import com.capstoneproject.themeal.model.entity.PaymentMethod;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

}
