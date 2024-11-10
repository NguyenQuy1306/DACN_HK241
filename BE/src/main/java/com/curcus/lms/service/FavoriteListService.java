package com.curcus.lms.service;

import com.curcus.lms.model.entity.FavoriteList;
import com.curcus.lms.model.response.FavoriteListResponse;

import java.util.List;

public interface FavoriteListService {
    List<FavoriteListResponse> findFavoriteListByCustomerId(Long customerId);
}
