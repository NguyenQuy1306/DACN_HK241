package com.curcus.lms.repository;

import com.curcus.lms.model.entity.OrderTable;
import com.curcus.lms.model.entity.RestaurantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RestaurantCategoryRepository extends JpaRepository<RestaurantCategory, Long> {
}
