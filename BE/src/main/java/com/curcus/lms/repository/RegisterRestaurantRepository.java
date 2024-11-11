package com.curcus.lms.repository;

import com.curcus.lms.model.entity.RegisterRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRestaurantRepository extends JpaRepository<RegisterRestaurant, Long> {

}
