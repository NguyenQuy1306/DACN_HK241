package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.FavoriteList;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.repository.UserRepository;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.mapper.FavoriteListMapper;
import com.capstoneproject.themeal.model.response.FavoriteListResponse;
import com.capstoneproject.themeal.repository.FavoriteListRepository;
import com.capstoneproject.themeal.service.FavoriteListService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteListServiceImpl implements FavoriteListService {
    @Autowired
    private FavoriteListRepository favoriteListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteListMapper favoriteListMapper;

    @Override
    public List<FavoriteListResponse> findFavoriteListByCustomerId(Long customerId) {
        return favoriteListRepository.findByMaSoKhachHang(customerId).stream()
                .map(FavoriteListMapper.INSTANCE::toFavoriteListResponse).collect(Collectors.toList());
    }

    @Override
    public FavoriteListResponse addNewList(String name, Long customerId) {
        Optional<User> user = userRepository.findById(customerId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User không ton tại!");
        }

        FavoriteList favoriteList = new FavoriteList();
        if (name != null) {
            favoriteList.setTen(name);
        } else {
            favoriteList.setTen("Danh sách mới");
        }
        favoriteList.setKhachHang(user.get());

        favoriteList.setThoiGianCapNhat(LocalDateTime.now());
        favoriteListRepository.save(favoriteList);
        return favoriteListMapper.toFavoriteListResponse(favoriteList);
    }

    @Override
    public FavoriteListResponse deleteListById(Long listId) {
        Optional<FavoriteList> favoriteList = favoriteListRepository.findById(listId);
        if (favoriteList.isEmpty()) {
            throw new IllegalArgumentException("Danh sách không tồn tại!");
        }

        return favoriteListMapper.toFavoriteListResponse(favoriteList.get());


    }

    @Override
    public FavoriteListResponse updateListById(Long listId, String newName) {
        Optional<FavoriteList> favoriteList = favoriteListRepository.findById(listId);
        if (favoriteList.isEmpty()) {
            throw new ResourceNotFoundException("List not found!");
        }
        favoriteList.get().setTen(newName);
        favoriteListRepository.save(favoriteList.get());
        return favoriteListMapper.toFavoriteListResponse(favoriteList.get());
    }

}
