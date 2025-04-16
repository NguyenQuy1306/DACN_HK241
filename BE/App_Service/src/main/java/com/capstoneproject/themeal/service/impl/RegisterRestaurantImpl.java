package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.RegisterRestaurant;
import com.capstoneproject.themeal.model.mapper.RegisterRestaurantMapper;
import com.capstoneproject.themeal.model.request.RegisterRestaurantRequest;
import com.capstoneproject.themeal.model.response.RegisterRestaurantResponse;
import com.capstoneproject.themeal.repository.RegisterRestaurantRepository;
import com.capstoneproject.themeal.service.RegisterRestaurantService;

import java.time.LocalDate;
import java.util.Date;

@Service
public class RegisterRestaurantImpl implements RegisterRestaurantService {

    @Autowired
    RegisterRestaurantRepository registerRestaurantRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public RegisterRestaurantResponse addNewRequest(RegisterRestaurantRequest registerRestaurantRequest) {
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setDiaChi(registerRestaurantRequest.getDiaChi());
        newRestaurant.setTen(registerRestaurantRequest.getTen());
        newRestaurant.setNgayThamGia(LocalDate.now());
        restaurantRepository.save(newRestaurant);
        RegisterRestaurant registerRestaurant = RegisterRestaurantMapper.INSTANCE
                .toRegisterRestaurant(registerRestaurantRequest);
        registerRestaurantRepository.save(registerRestaurant);
        return RegisterRestaurantMapper.INSTANCE.toRegisterRestaurantResponse(registerRestaurant);
    }
}
