package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
