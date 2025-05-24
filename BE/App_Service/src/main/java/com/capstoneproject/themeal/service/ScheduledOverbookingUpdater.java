package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.request.OverbookingRateRequest;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

@Service
public class ScheduledOverbookingUpdater {

    @Autowired
    private OverbookingService overbookingService;
    @Autowired
    private OrderTableRepository orderTableRepository;
    @Autowired
    private TableAvailableService tableAvailableService;

    @PostConstruct
    public void initUpdateWeeklyOverbookingRates() {
        overbookingService.updateOverbookingRateForAllRestaurants();
    }

    @PostConstruct
    public void initDeleteOverdueTableAvailable() {
        tableAvailableService.deleteOverdueTableAvailable();
    }

    @Scheduled(cron = "0 0 2 * * SUN") // Chạy vào lúc 2:00 sáng Chủ nhật mỗi tuần
    public void updateWeeklyOverbookingRatesForAllRestaurants() {
        // Gọi phương thức cập nhật tỷ lệ overbooking cho tất cả nhà hàng
        overbookingService.updateOverbookingRateForAllRestaurants();
    }

    @Scheduled(cron = "0 0 2 * * SUN") // Chạy vào lúc 2:00 sáng Chủ nhật mỗi tuần
    public void deleteOverdueTableAvailable() {
        // Gọi phương thức cập nhật tỷ lệ overbooking cho tất cả nhà hàng
        tableAvailableService.deleteOverdueTableAvailable();
    }
}
