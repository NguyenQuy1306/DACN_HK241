// package com.capstoneproject.themeal.service;

// import com.capstoneproject.themeal.model.entity.RestaurantElasticsearch;
// import com.capstoneproject.themeal.repository.ElasticSearchQuery;
// import com.fasterxml.jackson.databind.JsonNode;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.kafka.annotation.KafkaListener;
// import org.springframework.stereotype.Service;
// import java.io.IOException;

// @Service
// public class KafkaConsumerService {
// @Autowired
// private ElasticSearchQuery elasticSearchQuery;
// private final ObjectMapper objectMapper = new ObjectMapper();

// public KafkaConsumerService(ElasticSearchQuery elasticSearchQuery) {
// this.elasticSearchQuery = elasticSearchQuery;
// }

// @KafkaListener(topics = "curcus.public.nhahang", groupId =
// "elasticsearch-group")
// public void consumeMessage(String message) {
// try {
// JsonNode rootNode = objectMapper.readTree(message);
// System.out.println("ádssdsds");
// String operation = rootNode.path("op").asText(); // Lấy giá trị của "op"
// System.out.println("ádssdsds23232");
// JsonNode afterNode = rootNode.path("after");
// System.out.println("quy123");
// // Chỉ xử lý nếu "op" là "c" (Create) hoặc "u" (Update)
// if (!"c".equals(operation) && !"u".equals(operation)) {
// System.out.println("Skipping message: operation type is not 'c' or 'u'");
// return;
// }

// // Kiểm tra dữ liệu "after"
// if (afterNode.isMissingNode() || afterNode.isNull()) {
// System.out.println("No valid 'after' data found, skipping...");
// return;
// }
// System.out.println("aaaadxcxc");
// // Chuyển đổi dữ liệu từ JSON sang đối tượng RestaurantElasticsearch
// RestaurantElasticsearch restaurant = new RestaurantElasticsearch();
// restaurant.setMaSoNhaHang(afterNode.has("masonhahang") ?
// afterNode.get("masonhahang").asLong() : null);
// restaurant.setTen(afterNode.has("ten") ? afterNode.get("ten").asText() :
// null);
// restaurant.setDiaChi(afterNode.has("diachi") ?
// afterNode.get("diachi").asText() : null);
// restaurant.setLoaiHinh(afterNode.has("loaihinh") ?
// afterNode.get("loaihinh").asText() : null);
// restaurant.setPhuHop(afterNode.has("phuhop") ?
// afterNode.get("phuhop").asText() : null);
// restaurant.setMonDacSac(afterNode.has("mondacsac") ?
// afterNode.get("mondacsac").asText() : null);
// restaurant
// .setMoTaKhongGian(afterNode.has("motakhonggian") ?
// afterNode.get("motakhonggian").asText() : null);
// restaurant.setDiemDacTrung(afterNode.has("diemdactrung") ?
// afterNode.get("diemdactrung").asText() : null);
// restaurant.setKinhDo(afterNode.has("kinhdo") ?
// afterNode.get("kinhdo").asDouble() : null);
// restaurant.setViDo(afterNode.has("vido") ? afterNode.get("vido").asDouble() :
// null);
// System.out.println("quy123323232");

// // Ghi vào Elasticsearch
// String result = elasticSearchQuery.createOrUpdateDocument(restaurant);
// System.out.println(result);
// System.out.println("ấdasdasdsa");

// } catch (IOException e) {
// e.printStackTrace();
// System.err.println("Error processing Kafka message: " + message);
// }
// }
// }
