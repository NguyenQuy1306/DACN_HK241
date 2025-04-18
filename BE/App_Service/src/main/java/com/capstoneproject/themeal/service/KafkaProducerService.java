package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.controller.BehaviorController;
import com.capstoneproject.themeal.model.request.BehaviorRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    @Autowired
    @Qualifier("stringKafkaTemplate")
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    @Qualifier("userBehaviorKafkaTemplate")
    private KafkaTemplate<String, BehaviorRequest> userBehaviorKafkaTemplate;

    void sendMessages(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }

    public void sendUserBehavior(String topic, BehaviorRequest behaviorRequest) {
        userBehaviorKafkaTemplate.send(topic, behaviorRequest);
        System.out.println("✅ Sent behavior to Kafka topic '" + topic + "': " + behaviorRequest);
    }


}
