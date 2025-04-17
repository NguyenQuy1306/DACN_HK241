//package com.capstoneproject.themeal.service;
//
//import com.capstoneproject.themeal.exception.NotFoundException;
//import com.capstoneproject.themeal.model.entity.OrderTable;
//import com.capstoneproject.themeal.repository.OrderTableRepository;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//@Service
//public class OrderPredictConsumerService {
//    private final ObjectMapper objectMapper = new ObjectMapper();
//    @Autowired
//    private OrderTableRepository orderTableRepository;
//
//    @KafkaListener(topics = "cancel-result-topic", groupId = "cancel-consumer-group")
//    public void consumeMessage(String message) {
//        try {
//            JsonNode rootNode = objectMapper.readTree(message);
//            Long userId = rootNode.path("user_id").asLong();
//            Long orderId = rootNode.path("order_id").asLong();
//            double cancelProbability = rootNode.path("cancel_probability").asDouble();
//
//            System.out.println("userId: " + userId);
//            System.out.println("orderId: " + orderId);
//            System.out.println("cancelProbability: " + cancelProbability);
//
//            OrderTable orderTable = orderTableRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order not found"));
//            orderTable.setPercentNoShow(cancelProbability);
//            orderTableRepository.save(orderTable);
//            System.out.println("Complete save: " + cancelProbability);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
