package com.capstoneproject.themeal.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;

public interface TableAvailableService {
    public TableAvailable saveWithGeneratedThuTuBan(TableAvailable tableAvailable);

    public List<Map<String, Object>> getTableAvailableForRestaurant(Long restaurantId);
}
