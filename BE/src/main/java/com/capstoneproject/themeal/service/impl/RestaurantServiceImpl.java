package com.capstoneproject.themeal.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import com.capstoneproject.themeal.config.ApplicationConfig;
import com.capstoneproject.themeal.controller.AuthenticationController;
import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.mapper.RestaurantMapper;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.RestaurantService;
import com.capstoneproject.themeal.service.S3Service;

import org.springframework.data.domain.Page;

import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final AuthenticationController authenticationController;

    private final S3Client s3Client;

    private final ApplicationConfig applicationConfig;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantMapper restaurantMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private S3Service s3sService;
    @Autowired
    private RestaurantImageRepository restaurantImageRepository;

    RestaurantServiceImpl(ApplicationConfig applicationConfig, S3Client s3Client,
            AuthenticationController authenticationController) {
        this.applicationConfig = applicationConfig;
        this.s3Client = s3Client;
        this.authenticationController = authenticationController;
    }
    // @Override
    // public List<RestaurantResponse> getRestaurants() {
    // try {
    // List<Restaurant> restaurants = restaurantRepository.findAll();
    // return restaurants.stream()
    // .map(restaurantMapper::toDetailResponse)
    // .collect(Collectors.toList());
    // } catch (Exception ex) {
    // throw new ApplicationException();
    // }
    // }

    @Override
    public List<RestaurantInMapsResponse> getRecommendedList() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll();
            int numOfRes = Math.min(restaurants.size(), 10);
            List<Restaurant> recommendedList = new ArrayList<>();
            for (int i = 0; i < numOfRes; i++) {
                recommendedList.add(restaurants.get(i));
            }

            return recommendedList.stream().map(restaurantMapper::toDetailResponse).collect(Collectors.toList());

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public Page<RestaurantInMapsResponse> getRestaurantsInMaps(Double blLat, Double blLng, Double trLat, Double trLng,
            LocalTime time, LocalDate date, Byte people, Pageable pageable) {

        try {
            if (time != null && date != null && people != null) {

                return restaurantRepository.findRestaurantsInBoundaryWithTable(blLat, blLng, trLat, trLng,
                        RestaurantImageType.RESTAURANTIMAGE, date, time, people, pageable)
                        .map(restaurantMapper::toDetailResponse);
            }
            Page<Restaurant> restaurants = restaurantRepository.findRestaurantsInBoundary(blLat, blLng, trLat, trLng,
                    RestaurantImageType.RESTAURANTIMAGE, pageable);

            return restaurants.map(restaurantMapper::toDetailResponse);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public RestaurantInMapsResponse getRestaurant(Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new IllegalArgumentException("Owner ID not found: " + ownerId));
        try {
            Restaurant restaurant = restaurantRepository.findRestaurantByOwner(ownerId);
            if (restaurant == null) {
                throw new IllegalArgumentException("Restaurnt not found: ");
            }
            return restaurantMapper.toDetailResponse(restaurant);
        } catch (Exception e) {
            throw new ApplicationException();
        }

    }

    @Override
    public void findImagesToDelete(List<String> updatedImage, Restaurant restaurant) {
        Set<RestaurantImage> lImages = restaurant.getDanhSachAnhNhaHang().stream()
                .filter(q -> q.getKieuAnh() == RestaurantImageType.RESTAURANTIMAGE).collect(Collectors.toSet());
        List<String> listUrl = lImages.stream().map(image -> image.getURL()).collect(Collectors.toList());
        List<String> imagesToDelete = listUrl.stream().filter(url -> !updatedImage.contains(url))
                .collect(Collectors.toList());
        System.out.println("checkkk" + imagesToDelete.isEmpty());
        if (imagesToDelete.isEmpty()) {
            return;
        }
        s3sService.deleteObject("themealbucket1", imagesToDelete, restaurant.getMaSoNhaHang());

        for (String url : imagesToDelete) {
            System.out.println("checkkkurl" + url);
            RestaurantImage restaurantImage = restaurantImageRepository.findByUrl(url);
            System.out.println("checkkkurl23232 " + restaurantImage.getURL());
            restaurantImageRepository.deleteByUrl(url);
        }

    }

    @Override
    public void addNewRestaurantImages(List<MultipartFile> newImages, Long restaurantId, String bucketName,
            Restaurant restaurant) {
        for (MultipartFile file : newImages) {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty: " + file.getOriginalFilename());
            }
            String contentType = file.getContentType();
            String fileExtension = contentType != null && contentType.contains("png") ? ".png" : ".jpg";
            String timestamp = String.valueOf(System.currentTimeMillis());
            String fileName = timestamp + "_" + fileExtension;
            String s3Key = String.format("restaurants/%s/restaurantImage/%s", restaurantId, fileName);

            try (InputStream inputStream = file.getInputStream()) {
                PutObjectRequest putObjectRequest = PutObjectRequest
                        .builder().bucket(bucketName).key(s3Key).contentLength(file.getSize()).build();
                s3Client.putObject(putObjectRequest,
                        software.amazon.awssdk.core.sync.RequestBody.fromInputStream(inputStream, file.getSize()));
            } catch (Exception e) {
                throw new RuntimeException("Error reading file bytes", e);
            }

            // create new RestaurantImage
            RestaurantImage restaurantImage = RestaurantImage.builder()
                    .KieuAnh(RestaurantImageType.RESTAURANTIMAGE)
                    .NhaHang(restaurant)
                    .URL(s3Key)
                    .build();
            restaurantImageRepository.save(restaurantImage);
        }

    }
}
