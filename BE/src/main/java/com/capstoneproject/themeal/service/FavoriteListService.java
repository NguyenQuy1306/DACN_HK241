package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.entity.FavoriteList;
import com.capstoneproject.themeal.model.response.FavoriteListResponse;

public interface FavoriteListService {
    List<FavoriteListResponse> findFavoriteListByCustomerId(Long customerId);
}
