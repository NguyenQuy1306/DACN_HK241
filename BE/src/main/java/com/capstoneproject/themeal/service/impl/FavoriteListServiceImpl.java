package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.mapper.FavoriteListMapper;
import com.capstoneproject.themeal.model.response.FavoriteListResponse;
import com.capstoneproject.themeal.repository.FavoriteListRepository;
import com.capstoneproject.themeal.service.FavoriteListService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteListServiceImpl implements FavoriteListService {
    @Autowired
    FavoriteListRepository favoriteListRepository;

    @Override
    public List<FavoriteListResponse> findFavoriteListByCustomerId(Long customerId) {
        return favoriteListRepository.findByMaSoKhachHang(customerId).stream()
                .map(FavoriteListMapper.INSTANCE::toFavoriteListResponse).collect(Collectors.toList());
    }

}
