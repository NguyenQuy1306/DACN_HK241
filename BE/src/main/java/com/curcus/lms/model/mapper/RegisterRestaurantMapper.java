package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.RegisterRestaurant;
import com.curcus.lms.model.request.RegisterRestaurantRequest;
import com.curcus.lms.model.response.RegisterRestaurantResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RegisterRestaurantMapper {
    RegisterRestaurantMapper INSTANCE = Mappers.getMapper(RegisterRestaurantMapper.class);

    RegisterRestaurant toRegisterRestaurant(RegisterRestaurantRequest registerRestaurantRequest);
    RegisterRestaurantResponse toRegisterRestaurantResponse(RegisterRestaurant registerRestaurant);
}
