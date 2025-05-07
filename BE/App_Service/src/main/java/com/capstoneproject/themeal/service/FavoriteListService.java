package com.capstoneproject.themeal.service;

import java.util.List;

import com.capstoneproject.themeal.model.entity.FavoriteList;
import com.capstoneproject.themeal.model.response.FavoriteListResponse;

public interface FavoriteListService {
    List<FavoriteListResponse> findFavoriteListByCustomerId(Long customerId);
    FavoriteListResponse addNewList(String name, Long customerId);
    FavoriteListResponse deleteListById(Long listId);
    FavoriteListResponse updateListById(Long listId, String newName);
}
