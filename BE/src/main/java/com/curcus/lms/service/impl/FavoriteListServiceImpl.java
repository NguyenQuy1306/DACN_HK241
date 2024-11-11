package com.curcus.lms.service.impl;

import com.curcus.lms.model.mapper.FavoriteListMapper;
import com.curcus.lms.model.response.FavoriteListResponse;
import com.curcus.lms.repository.FavoriteListRepository;
import com.curcus.lms.service.FavoriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteListServiceImpl implements FavoriteListService {
    @Autowired
    FavoriteListRepository favoriteListRepository;

    @Override
    public List<FavoriteListResponse> findFavoriteListByCustomerId(Long customerId) {
        return favoriteListRepository.findByMaSoKhachHang(customerId).stream().map(FavoriteListMapper.INSTANCE::toFavoriteListResponse).collect(Collectors.toList());
    }

}
