package com.capstoneproject.themeal.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface RestaurantService {
        // List<RestaurantResponse> getRestaurants();

        Page<RestaurantInMapsResponse> getRestaurantsInMaps(Double blLat, Double blLng, Double trLat, Double trLng,
                        LocalTime time, LocalDate date, Byte people, String thanhPho, Pageable pageable);

        List<RestaurantInMapsResponse> getRecommendedList();

        public RestaurantInMapsResponse getRestaurant(Long ownerId);

        public void findImagesToDelete(List<String> updatedImage, Restaurant restaurant);

        public void addNewRestaurantImages(List<MultipartFile> newImages, Long restaurantId, String bucketName,
                        Restaurant restaurant);
}
