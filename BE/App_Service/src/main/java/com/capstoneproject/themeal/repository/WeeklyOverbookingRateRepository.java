package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.WeeklyOverbookingRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeeklyOverbookingRateRepository extends JpaRepository<WeeklyOverbookingRate, Long> {
    // Bạn có thể thêm các phương thức tùy chỉnh nếu cần
    WeeklyOverbookingRate findByDayOfWeek(Integer dayOfWeek);

    WeeklyOverbookingRate findByRestaurantIdAndDayOfWeek(Long restaurantId, int dayOfWeek);


}
