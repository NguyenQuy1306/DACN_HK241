package com.capstoneproject.themeal.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.RestaurantElasticsearch;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.DeleteRequest;
import co.elastic.clients.elasticsearch.core.DeleteResponse;
import co.elastic.clients.elasticsearch.core.GetRequest;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Highlight;
import co.elastic.clients.elasticsearch.core.search.HighlightField;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;

@Repository
public class ElasticSearchQuery {
        @Autowired
        private ElasticsearchClient elasticsearchClient;

        private final String indexName = "restaurants";

        public String createOrUpdateDocument(RestaurantElasticsearch restaurantElasticsearch) throws IOException {
                System.out.println("nguyennnn232n");
                IndexResponse response = elasticsearchClient.index(i -> i.index(indexName)
                                .id(String.valueOf(restaurantElasticsearch.getMaSoNhaHang()))
                                .document(restaurantElasticsearch));
                System.out.println("kkkssdsdsds");
                if (response.result().name().equals("Created")) {
                        return new StringBuilder("Document has been successfully created.").toString();
                } else if (response.result().name().equals("Updated")) {
                        return new StringBuilder("Document has been successfully updated.").toString();
                }
                return new StringBuilder("Error while performing the operation.").toString();
        }

        public RestaurantElasticsearch getDocumentById(String restaurantId) throws IOException {
                RestaurantElasticsearch restaurant = null;
                GetRequest getRequest = GetRequest.of(g -> g.index(indexName).id(restaurantId));
                GetResponse<RestaurantElasticsearch> restaurantGetResponse = elasticsearchClient.get(getRequest,
                                RestaurantElasticsearch.class);
                if (restaurantGetResponse.found()) {
                        restaurant = restaurantGetResponse.source();
                        System.out.println("Restaurant name " + restaurant.getTen());
                } else {
                        System.out.println("Restaurant not found");
                }
                return restaurant;
        }

        public String deleteDocumentById(String restaurantId) throws IOException {
                DeleteRequest deleteRequest = DeleteRequest.of(d -> d.index(indexName).id(restaurantId));
                DeleteResponse deleteResponse = elasticsearchClient.delete(deleteRequest);
                if (Objects.nonNull(deleteResponse.result()) && deleteResponse.result().name().equals("Not found")) {
                        return new StringBuilder("Product with id " + deleteResponse.id() + " has been deleted.")
                                        .toString();

                }
                System.out.println("Product not found");
                return new StringBuilder("Product with id " + restaurantId + " dose not exist.").toString();
        }

        public List<RestaurantElasticsearch> searchALlDocuments() throws IOException {
                List<RestaurantElasticsearch> restaurantElasticsearches = new ArrayList<>();
                SearchRequest searchRequest = SearchRequest.of(s -> s.index(indexName));
                SearchResponse searchResponse = elasticsearchClient.search(searchRequest,
                                RestaurantElasticsearch.class);
                List<Hit> hits = searchResponse.hits().hits();
                for (Hit object : hits) {
                        System.out.println(((RestaurantElasticsearch) object.source()));
                        restaurantElasticsearches.add(((RestaurantElasticsearch) object.source()));
                }
                return restaurantElasticsearches;
        }

        public List<Map<String, Object>> searchByKeyword(String param) throws IOException {
                List<Map<String, Object>> keywords = new ArrayList<>();
                Query multiMatchQuery = MultiMatchQuery.of(q -> q
                                .query(param)
                                .fields("ten", "monDacSac", "moTaKhongGian", "phuHop", "quan", "diemDacTrung")
                                .operator(Operator.And))._toQuery();
                Map<String, HighlightField> highlightFields = new HashMap<>();
                highlightFields.put("ten", HighlightField.of(hf -> hf));
                highlightFields.put("monDacSac", HighlightField.of(hf -> hf));
                highlightFields.put("moTaKhongGian", HighlightField.of(hf -> hf));
                highlightFields.put("phuHop", HighlightField.of(hf -> hf));
                highlightFields.put("quan", HighlightField.of(hf -> hf));
                highlightFields.put("diemDacTrung", HighlightField.of(hf -> hf));

                // ✅ Create highlight object
                Highlight highlight = Highlight.of(h -> h.fields(highlightFields));
                SearchRequest searchRequest = SearchRequest.of(s -> s.index("restaurants").query(multiMatchQuery)
                                .highlight(highlight));
                SearchResponse<Void> searchResponse = elasticsearchClient.search(searchRequest, Void.class);
                // List<Hit<Void>> hits = searchResponse.hits().hits();
                for (Hit<Void> object : searchResponse.hits().hits()) {
                        Map<String, Object> field = new HashMap<>();
                        field.put("ten", object.highlight() != null && object.highlight().get("ten") != null
                                        ? object.highlight().get("ten")
                                        : Collections.emptyList());

                        field.put("monDacSac", object.highlight() != null && object.highlight().get("monDacSac") != null
                                        ? object.highlight().get("monDacSac")
                                        : Collections.emptyList());

                        field.put("moTaKhongGian",
                                        object.highlight() != null && object.highlight().get("moTaKhongGian") != null
                                                        ? object.highlight().get("moTaKhongGian")
                                                        : Collections.emptyList());

                        field.put("phuHop", object.highlight() != null && object.highlight().get("phuHop") != null
                                        ? object.highlight().get("phuHop")
                                        : Collections.emptyList());

                        field.put("quan", object.highlight() != null && object.highlight().get("quan") != null
                                        ? object.highlight().get("quan")
                                        : Collections.emptyList());

                        field.put("diemDacTrung",
                                        object.highlight() != null && object.highlight().get("diemDacTrung") != null
                                                        ? object.highlight().get("diemDacTrung")
                                                        : Collections.emptyList());

                        keywords.add(field);
                }

                return keywords;
        }
}
