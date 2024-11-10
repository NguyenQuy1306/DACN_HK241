package com.curcus.lms.service;

import java.util.List;
import java.util.Map;

import com.curcus.lms.model.entity.TableAvailable;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import org.springframework.data.domain.Pageable;

public interface TableAvailableService {
    public TableAvailable saveWithGeneratedThuTuBan(TableAvailable tableAvailable);

    public List<Map<String, Object>> getTableAvailableForRestaurant(Long restaurantId);
}
