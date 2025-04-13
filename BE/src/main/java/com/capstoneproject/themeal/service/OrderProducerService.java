package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.request.OrderEvent;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducerService {
    @Autowired
    @Qualifier("orderEventKafkaTemplate")
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;
    @Value("${kafka.topic.booking-request-events}")
    private String bookingRequestTopic;

    public void sendBookingRequestEvent(OrderEvent event) {
        kafkaTemplate.send(bookingRequestTopic, event.getOrderId().toString(), event);
    }

}
