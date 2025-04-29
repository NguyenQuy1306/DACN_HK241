package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

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
    @Autowired
    private WeeklyOverbookingRateRepository weeklyOverbookingRateRepository;

    private void handleOrderWithHighPercentNoShow(OrderTable orderTable) {
        System.out.println("handleOrderWithHighPercentNoShow");
        OverbookingSettings overbookingSettings = overbookingSettingsRepository.findByRestaurantId(orderTable.getNhaHang().getMaSoNhaHang());
        ThresholdRule thresholdRule = thresholdRuleRepository.findByOverbookingId(overbookingSettings.getId(), "overbooking");
        Double percent = orderTable.getPercentNoShow() * 100;
        System.out.println("percent:: " + percent);
        System.out.println("thresholdRule.getMin(:: " + thresholdRule.getMin());
        if (percent >= thresholdRule.getMin()) {
            System.out.println("check: ");

            List<TableAvailable> existingTables = tableAvailableRepository.findExistingTables(
                    orderTable.getNhaHang().getMaSoNhaHang(),
                    Arrays.asList(orderTable.getNgay()),
                    Arrays.asList(orderTable.getGio()),
                    Arrays.asList(orderTable.getSoKhach()));
            System.out.println("check: " + existingTables.isEmpty());
//                tableRequests.stream().map(TableRequest::getSoLuong).collect(Collectors.toList())
            if (existingTables.size() == 1) {
                System.out.println("check:123 ");
                int dayofweek = orderTable.getNgay().getDayOfWeek().getValue();
                WeeklyOverbookingRate weeklyOverbookingRate = weeklyOverbookingRateRepository.findByRestaurantIdAndDayOfWeek(orderTable.getNhaHang().getMaSoNhaHang(), dayofweek);
                System.out.println("check:232 ");
                if (weeklyOverbookingRate == null) {
                    throw new EntityExistsException("WeeklyOverbookingRate table not found");
                }

                TableAvailable available = existingTables.getFirst();
                Long count_number_overbooking_used_of_ordertable = orderTableRepository.countCanceledOrNoShowOrdersByDateAndTimeSlot(orderTable.getNhaHang().getMaSoNhaHang(), orderTable.getNgay());
                Long maxoverbooking = weeklyOverbookingRate.getMaxoverbooking();
                System.out.println("maxoverbooking: " + maxoverbooking);
                System.out.println("count:: " + count_number_overbooking_used_of_ordertable);
                if (count_number_overbooking_used_of_ordertable < maxoverbooking) {
                    System.out.println("available.getSoLuong() " + available.getSoLuong() + 1);
                    Long newSoLuong = (available.getSoLuong() + 1L);
                    System.out.println("newSoLuong " + newSoLuong);
                    available.setSoLuong(newSoLuong);
                    tableAvailableRepository.save(available);
                } else {
                    return;
                }

            } else if (existingTables.isEmpty()) {
                throw new EntityNotFoundException("No matching table available found.");
            } else {
                throw new IllegalStateException("Multiple tables found when only one expected.");
            }

            System.out.println("Check Scheduled 6");
        }

    }

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
            orderTable.setPercentNoShow(0.9);


            handleOrderWithHighPercentNoShow(orderTable);

            orderTableRepository.save(orderTable);
            System.out.println("Complete save: " + cancelProbability);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
