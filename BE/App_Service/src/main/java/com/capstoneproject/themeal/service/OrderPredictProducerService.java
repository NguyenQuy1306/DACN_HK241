package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.OrderPredict;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderPredictProducerService {
    @Autowired
    @Qualifier("orderEventKafkaTemplate")
    private KafkaTemplate<String, OrderPredict> kafkaTemplate;
    @Value("${kafka.topic.predict-request-events}")
    private String bookingRequestTopic;

    public void sendBookingRequestEvent(OrderPredict event) {
        kafkaTemplate.send(bookingRequestTopic, event.getOrderId().toString(), event);
    }

}
