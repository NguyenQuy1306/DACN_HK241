package com.curcus.lms.service.impl;

import com.curcus.lms.model.mapper.RestaurantCategoryMapper;
import com.curcus.lms.model.response.RestaurantCategoryResponse;
import com.curcus.lms.repository.RestaurantCategoryRepository;
import com.curcus.lms.service.RestaurantCategoryService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantCategoryImpl implements RestaurantCategoryService {
    @Autowired
    private RestaurantCategoryRepository restaurantCategoryRepository;

    @Override
    public List<RestaurantCategoryResponse> getAll() {
        System.out.println(restaurantCategoryRepository.findAll());
        return restaurantCategoryRepository.findAll().stream().map(RestaurantCategoryMapper.INSTANCE::toRestaurantCategoryResponse).collect(Collectors.toList());
    }
}
