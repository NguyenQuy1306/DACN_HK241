package com.capstoneproject.themeal.service.impl;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.mapper.RestaurantCategoryMapper;
import com.capstoneproject.themeal.model.response.RestaurantCategoryResponse;
import com.capstoneproject.themeal.repository.RestaurantCategoryRepository;
import com.capstoneproject.themeal.service.RestaurantCategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantCategoryImpl implements RestaurantCategoryService {
    @Autowired
    private RestaurantCategoryRepository restaurantCategoryRepository;

    @Override
    public List<RestaurantCategoryResponse> getAll() {

        return restaurantCategoryRepository.findAll().stream()
                .map(RestaurantCategoryMapper.INSTANCE::toRestaurantCategoryResponse).collect(Collectors.toList());
    }
}
