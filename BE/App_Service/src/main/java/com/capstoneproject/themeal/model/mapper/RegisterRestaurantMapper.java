package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.capstoneproject.themeal.model.entity.RegisterRestaurant;
import com.capstoneproject.themeal.model.request.RegisterRestaurantRequest;
import com.capstoneproject.themeal.model.response.RegisterRestaurantResponse;

@Mapper
public interface RegisterRestaurantMapper {
    RegisterRestaurantMapper INSTANCE = Mappers.getMapper(RegisterRestaurantMapper.class);

    RegisterRestaurant toRegisterRestaurant(RegisterRestaurantRequest registerRestaurantRequest);

    RegisterRestaurantResponse toRegisterRestaurantResponse(RegisterRestaurant registerRestaurant);
}
