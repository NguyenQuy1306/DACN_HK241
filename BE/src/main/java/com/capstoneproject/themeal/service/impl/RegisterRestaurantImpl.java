package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.RegisterRestaurant;
import com.capstoneproject.themeal.model.mapper.RegisterRestaurantMapper;
import com.capstoneproject.themeal.model.request.RegisterRestaurantRequest;
import com.capstoneproject.themeal.model.response.RegisterRestaurantResponse;
import com.capstoneproject.themeal.repository.RegisterRestaurantRepository;
import com.capstoneproject.themeal.service.RegisterRestaurantService;

@Service
public class RegisterRestaurantImpl implements RegisterRestaurantService {

    @Autowired
    RegisterRestaurantRepository registerRestaurantRepository;

    @Override
    public RegisterRestaurantResponse addNewRequest(RegisterRestaurantRequest registerRestaurantRequest) {
        RegisterRestaurant registerRestaurant = RegisterRestaurantMapper.INSTANCE
                .toRegisterRestaurant(registerRestaurantRequest);
        registerRestaurantRepository.save(registerRestaurant);
        return RegisterRestaurantMapper.INSTANCE.toRegisterRestaurantResponse(registerRestaurant);
    }
}
