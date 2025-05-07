package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.RestaurantMongoDB;
import com.capstoneproject.themeal.repository.ElasticSearchQuery;
import com.capstoneproject.themeal.repository.RestaurantMongoDbRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MongoConsumerService {
    @Autowired
    private RestaurantMongoDbRepository restaurantMongoDbRepository;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${kafka.elasticsearch.topic}", groupId = "${kafka.mongodb.group.id}")
    public void consumeMessage(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            String operation = rootNode.path("op").asText();
            JsonNode afterNode = rootNode.path("after");
            System.out.println("operation print: " + operation);
            if (afterNode.isMissingNode() || afterNode.isNull()) {
                return;
            }
            RestaurantMongoDB restaurant = new RestaurantMongoDB();
            restaurant.setMaSoNhaHang(afterNode.has("masonhahang") ? afterNode.get("masonhahang").asLong() : null);
            restaurant.setTen(afterNode.has("ten") ? afterNode.get("ten").asText() : null);
            restaurant.setDiaChi(afterNode.has("diachi") ? afterNode.get("diachi").asText() : null);
            restaurant.setLoaiHinh(afterNode.has("loaihinh") ? afterNode.get("loaihinh").asText() : null);
            restaurant.setPhuHop(afterNode.has("phuhop") ? afterNode.get("phuhop").asText() : null);
            restaurant.setMonDacSac(afterNode.has("mondacsac") ? afterNode.get("mondacsac").asText() : null);
            restaurant
                    .setMoTaKhongGian(afterNode.has("motakhonggian") ? afterNode.get("motakhonggian").asText() : null);
            restaurant.setDiemDacTrung(afterNode.has("diemdactrung") ? afterNode.get("diemdactrung").asText() : null);


            restaurantMongoDbRepository.save(restaurant);
            kafkaProducerService.sendMessages("user-behavior-data", message);

        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Error processing Kafka with mongoDB, message: " + message);
        }
    }


}
