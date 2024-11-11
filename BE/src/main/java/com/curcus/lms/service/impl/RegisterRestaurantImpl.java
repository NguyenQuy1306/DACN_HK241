package com.curcus.lms.service.impl;


import com.curcus.lms.model.entity.RegisterRestaurant;
import com.curcus.lms.model.mapper.RegisterRestaurantMapper;
import com.curcus.lms.model.request.RegisterRestaurantRequest;
import com.curcus.lms.model.response.RegisterRestaurantResponse;
import com.curcus.lms.repository.RegisterRestaurantRepository;
import com.curcus.lms.service.RegisterRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterRestaurantImpl implements RegisterRestaurantService {

    @Autowired
    RegisterRestaurantRepository registerRestaurantRepository;

    @Override
    public RegisterRestaurantResponse addNewRequest(RegisterRestaurantRequest registerRestaurantRequest) {
        RegisterRestaurant registerRestaurant = RegisterRestaurantMapper.INSTANCE.toRegisterRestaurant(registerRestaurantRequest);
        registerRestaurantRepository.save(registerRestaurant);
        return RegisterRestaurantMapper.INSTANCE.toRegisterRestaurantResponse(registerRestaurant);
    }
}
