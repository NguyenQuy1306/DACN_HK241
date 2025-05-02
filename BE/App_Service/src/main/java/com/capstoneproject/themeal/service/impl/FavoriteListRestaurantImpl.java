package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.FavoriteList;
import com.capstoneproject.themeal.model.entity.FavoriteListRestaurantId;
import com.capstoneproject.themeal.model.response.FavoriteListResponse;
import com.capstoneproject.themeal.repository.FavoriteListRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.FavoriteListRestaurant;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.mapper.FavoriteListRestaurantMapper;
import com.capstoneproject.themeal.model.mapper.RestaurantMapper;
import com.capstoneproject.themeal.model.response.FavoriteListRestaurantResponse;
import com.capstoneproject.themeal.model.response.RestaurantResponse;
import com.capstoneproject.themeal.repository.FavoriteListRestaurantRepository;
import com.capstoneproject.themeal.service.FavoriteListRestaurantService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteListRestaurantImpl implements FavoriteListRestaurantService {
    private RestaurantMapper restaurantMapper;
    @Autowired
    FavoriteListRestaurantRepository favoriteListRestaurantRepository;
    @Autowired
    private FavoriteListRepository favoriteListRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public List<FavoriteListRestaurantResponse> findByFavoriteListId(Long favoriteListId) {
        List<FavoriteListRestaurant> favoriteListRestaurants = favoriteListRestaurantRepository
                .findByFavoriteListId(favoriteListId);
        return favoriteListRestaurants.stream()
                .map(FavoriteListRestaurantMapper.INSTANCE::toFavoriteListRestaurantResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteByFavoriteListId(Long favoriteListId) {
        FavoriteList favoriteList = favoriteListRepository.findById(favoriteListId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite list not found with ID: " + favoriteListId));
        favoriteListRestaurantRepository.deleteAllByDanhSachYeuThich(favoriteList);
        favoriteListRepository.delete(favoriteList);
    }

    @Override
    public void addRestaurant(Long favoriteListId, Long restaurantId) {
        // 1. Lấy danh sách yêu thích từ DB
        FavoriteList favoriteList = favoriteListRepository.findById(favoriteListId)
                .orElseThrow(() -> new RuntimeException("Favorite list not found"));

        // 2. Lấy nhà hàng từ DB
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // 3. Tạo ID cho bảng trung gian
        FavoriteListRestaurantId id = new FavoriteListRestaurantId(restaurantId, favoriteListId);

        // 4. Kiểm tra nếu đã tồn tại thì không thêm nữa
        if (favoriteListRestaurantRepository.existsById(id)) {
            throw new RuntimeException("This restaurant is already in the favorite list");
        }

        // 5. Tạo entity và lưu
        FavoriteListRestaurant favoriteListRestaurant = FavoriteListRestaurant.builder()
                .MaSo(id)
                .DanhSachYeuThich(favoriteList)
                .NhaHang(restaurant)
                .build();

        favoriteListRestaurantRepository.save(favoriteListRestaurant);
    }
}
