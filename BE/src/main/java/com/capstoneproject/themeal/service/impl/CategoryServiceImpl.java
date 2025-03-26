package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.mapper.CategoryMapper;
import com.capstoneproject.themeal.model.request.CategoryRequest;
import com.capstoneproject.themeal.model.response.FoodFinalReponse;
import com.capstoneproject.themeal.model.response.FoodResponse;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.Category;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.mapper.FoodMapper;
import com.capstoneproject.themeal.model.response.CategoryResponse;
import com.capstoneproject.themeal.repository.CategoryRepository;
import com.capstoneproject.themeal.service.CategoryService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Lazy
    @Autowired
    private FoodServiceImpl foodServiceImpl;
    @Autowired
    private FoodMapper foodMapper;
    @Autowired
    private RestaurantRepository restaurantRepository;



    @Override
    public List<CategoryResponse> getAllCategoryByRestaurantId(Long restaurantId) {

        Pageable pageable = PageRequest.of(0, 30);
        try {
            List<CategoryResponse> categoryResponses =  categoryRepository.getCategories(restaurantId).stream().map(q -> foodMapper.toCategoryResponse(q))
                    .collect(Collectors.toList());
            categoryResponses.forEach(q-> {
                List<FoodFinalReponse> tmp = foodServiceImpl.getFoodByCategoryId(pageable,restaurantId,q.getMaSoDanhMuc());
                if (tmp.size() > 0) {
                    q.setSoLuongMon(tmp.get(0).getFoodResponses().size());
                } else {
                    q.setSoLuongMon(0);
                }


                if (q.getSoLuongMon() > 0) {
                    Long minPrice = tmp.get(0).getFoodResponses().stream().map(FoodResponse::getGia).min(Long::compareTo).orElse(0L);
                    Long maxPrice = tmp.get(0).getFoodResponses().stream().map(FoodResponse::getGia).max(Long::compareTo).orElse(0L);
                    q.setMinPrice(minPrice);
                    q.setMaxPrice(maxPrice);
                } else {
                    q.setMaxPrice(0L);
                    q.setMinPrice(0L);
                }
            });
            return categoryResponses;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching categories", e); // Ném lỗi để Controller xử lý
        }
    }

    @Override
    public void checkCategoryExist(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Food ID not found: " + categoryId));

    }

    @Override
    public List<CategoryResponse> addNewCategory(Long restaurantId) {
        if (restaurantRepository.findById(restaurantId).isEmpty()) {
            throw new IllegalArgumentException("Restaurant ID not found: " + restaurantId);
        } else {
            Category category = new Category();
            category.setTen("Danh mục mới");
            category.setNhaHang(restaurantRepository.findById(restaurantId).get());
            categoryRepository.save(category);
        }
        return getAllCategoryByRestaurantId(restaurantId);
    }

    @Override
    public List<CategoryResponse> deleteCategory(Long restaurantId, Long categoryId) {
        if (restaurantRepository.findById(restaurantId).isEmpty()) {
            throw new IllegalArgumentException("Restaurant ID not found: " + restaurantId);
        } else {
            categoryRepository.deleteById(categoryId);
        }
        return getAllCategoryByRestaurantId(restaurantId);
    }

    @Override
    public List<CategoryResponse> searchCategory(Long restaurantId, String keyword) {
        if (restaurantRepository.findById(restaurantId).isEmpty()) {
            throw new IllegalArgumentException("Restaurant ID not found: " + restaurantId);
        } else {
            List<Category> categories = categoryRepository.searchCategory(restaurantId, keyword);
            return categories.stream().map(foodMapper::toCategoryResponse).collect(Collectors.toList());
        }

    }

    @Override
    public List<CategoryResponse> updateCategory(Long categoryId,CategoryRequest categoryRequest) {
        if (restaurantRepository.findById(categoryRequest.getRestaurantId()).isEmpty()) {
            throw new IllegalArgumentException("Restaurant ID not found: " + categoryRequest.getRestaurantId());
        } else {
            Optional<Category> category = categoryRepository.findById(categoryId);
            if (category.isEmpty()) {
                throw new IllegalArgumentException("Category ID not found: " + categoryId);
            } else {
                Category categoryUpdate = category.get();
                categoryUpdate.setTen(categoryRequest.getName());
                categoryRepository.save(categoryUpdate);
            }
            return getAllCategoryByRestaurantId(categoryRequest.getRestaurantId());
        }
    }

}
