package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import com.capstoneproject.themeal.repository.OverbookingSettingsRepository;
import com.capstoneproject.themeal.repository.TableAvailableRepository;
import com.capstoneproject.themeal.repository.ThresholdRuleRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderPredictConsumerService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private OrderTableRepository orderTableRepository;
    @Autowired
    private ThresholdRuleRepository thresholdRuleRepository;
    @Autowired
    private OverbookingSettingsRepository overbookingSettingsRepository;
    @Autowired
    private TableAvailableRepository tableAvailableRepository;

//    private void handleOrderWithHighPercentNoShow(OrderTable orderTable) {
//        System.out.println("handleOrderWithHighPercentNoShow");
//        OverbookingSettings overbookingSettings = overbookingSettingsRepository.findByRestaurantId(orderTable.getNhaHang().getMaSoNhaHang());
//        ThresholdRule thresholdRule = thresholdRuleRepository.findByOverbookingId(overbookingSettings.getId(), "email-warning");
//        Double percent = orderTable.getPercentNoShow() * 100;
//        System.out.println("percent:: " + percent);
//        System.out.println("thresholdRule.getMin(:: " + thresholdRule.getMin());
//        if (percent >= thresholdRule.getMax()) {

    /// /            TableAvailable tableAvailable=tableAvailableRepository.findExistingTables();
//            System.out.println("Check Scheduled 6");
//        }
//        if ( orderTable.getPercentNoShow();
//    }

    @KafkaListener(topics = "cancel-result-topic", groupId = "cancel-consumer-group")
    public void consumeMessage(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            Long userId = rootNode.path("user_id").asLong();
            Long orderId = rootNode.path("order_id").asLong();
            double cancelProbability = rootNode.path("cancel_probability").asDouble();

            System.out.println("userId: " + userId);
            System.out.println("orderId: " + orderId);
            System.out.println("cancelProbability: " + cancelProbability);

            OrderTable orderTable = orderTableRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order not found"));
            orderTable.setPercentNoShow(cancelProbability);

            orderTableRepository.save(orderTable);
            System.out.println("Complete save: " + cancelProbability);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
