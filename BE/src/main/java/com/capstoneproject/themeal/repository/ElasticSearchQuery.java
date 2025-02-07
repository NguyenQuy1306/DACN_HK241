package com.capstoneproject.themeal.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.*;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.capstoneproject.themeal.model.entity.RestaurantElasticsearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class ElasticSearchQuery {
    @Autowired
    private ElasticsearchClient elasticsearchClient;

    private final String indexName = "restaurants";

    public String createOrUpdateDocument(RestaurantElasticsearch restaurantElasticsearch) throws IOException {
        System.out.println("nguyennnn232n");
        IndexResponse response = elasticsearchClient.index(i -> i.index(indexName)
                .id(String.valueOf(restaurantElasticsearch.getMaSoNhaHang())).document(restaurantElasticsearch));
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
            return new StringBuilder("Product with id " + deleteResponse.id() + " has been deleted.").toString();

        }
        System.out.println("Product not found");
        return new StringBuilder("Product with id " + restaurantId + " dose not exist.").toString();
    }

    public List<RestaurantElasticsearch> searchALlDocuments() throws IOException {
        List<RestaurantElasticsearch> restaurantElasticsearches = new ArrayList<>();
        SearchRequest searchRequest = SearchRequest.of(s -> s.index(indexName));
        SearchResponse searchResponse = elasticsearchClient.search(searchRequest, RestaurantElasticsearch.class);
        List<Hit> hits = searchResponse.hits().hits();
        for (Hit object : hits) {
            System.out.println(((RestaurantElasticsearch) object.source()));
            restaurantElasticsearches.add(((RestaurantElasticsearch) object.source()));
        }
        return restaurantElasticsearches;
    }
}
