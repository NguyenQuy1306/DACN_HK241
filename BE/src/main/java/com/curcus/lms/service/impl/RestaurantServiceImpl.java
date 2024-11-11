package com.curcus.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.model.entity.*;
import com.curcus.lms.model.mapper.RestaurantMapper;
import com.curcus.lms.repository.*;
import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.service.RestaurantService;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantMapper restaurantMapper;
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
            for (int i=0;i<numOfRes;i++) {
                recommendedList.add(restaurants.get(i));
            }

            return recommendedList.stream().map(restaurantMapper::toDetailResponse).collect(Collectors.toList());


        } catch  (Exception ex){
            throw new ApplicationException();
        }
    }

    @Override
    public List<RestaurantInMapsResponse> getRestaurantsInMaps(Double blLat, Double blLng, Double trLat, Double trLng,
            Pageable pageable) {

        try {
            List<Restaurant> restaurants = restaurantRepository.findRestaurantsInBoundary(blLat, blLng, trLat, trLng,
                    RestaurantImageType.RESTAURANTIMAGE, pageable);
            // restaurants.forEach(restaurant -> {
            // System.out.println("Nhà hàng ID: " + restaurant.getDanhSachAnhNhaHang());
            // System.out.println("Danh sách phương thức thanh toán:");

            // // Kiểm tra nếu danhSachNhaHangCoPhuongThucThanhToan không rỗng
            // if (restaurant.getDanhSachNhaHangCoPhuongThucThanhToan() != null) {
            // restaurant.getDanhSachNhaHangCoPhuongThucThanhToan()
            // .forEach(paymentMethod -> System.out.println(paymentMethod.toString()) // Tùy
            // chỉnh cách in
            // // của phương thức
            // // thanh toán nếu cần
            // );
            // } else {
            // System.out.println("Không có phương thức thanh toán nào.");
            // }

            // System.out.println("-------------");
            // });
            return restaurants.stream()
                    .map(restaurantMapper::toDetailResponse)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

}
