package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.request.OrderTrainingEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderTrainingProducerService {
    @Autowired
    @Qualifier("orderTrainingKafkaTemplate")
    private KafkaTemplate<String, OrderTrainingEvent> kafkaTemplate;
    @Value("${kafka.topic.training-request-events}")
    private String bookingRequestTopic;

    public void sendBookingRequestEvent(OrderTrainingEvent event) {
        kafkaTemplate.send(bookingRequestTopic, event.getOrderId().toString(), event);
    }

}
