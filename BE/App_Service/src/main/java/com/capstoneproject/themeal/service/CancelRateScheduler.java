package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.OverbookingSettings;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.ThresholdRule;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import com.capstoneproject.themeal.repository.OverbookingSettingsRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.ThresholdRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CancelRateScheduler {

    @Autowired
    private OrderTableRepository orderTableRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private ThresholdRuleRepository thresholdRuleRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private OverbookingSettingsRepository overbookingSettingsRepository;

    @Scheduled(fixedRate = 60 * 1000) // Mỗi 10 phút
    public void checkAndNotifyCancelRate() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime targetTime = now.plusHours(1);
        List<OrderTable> orderTables = orderTableRepository.findBookingsToConfirmByCancelRate(
                targetTime.toLocalDate(), now.toLocalTime(), targetTime.toLocalTime()

        );
        for (OrderTable orderTable : orderTables) {
            OverbookingSettings overbookingSettings = overbookingSettingsRepository.findByRestaurantId(orderTable.getNhaHang().getMaSoNhaHang());
            ThresholdRule thresholdRule = thresholdRuleRepository.findByOverbookingId(overbookingSettings.getId(), "email-warning");
            Double percent = orderTable.getPercentNoShow() * 100;
            if (percent > thresholdRule.getMin() && percent < thresholdRule.getMax() && orderTable.getEmailConfirmSent() == false) {
                emailService.sendConfirmArrivalEmail(orderTable);
                System.out.println("Check Scheduled 6");
            }
        }
    }
}
