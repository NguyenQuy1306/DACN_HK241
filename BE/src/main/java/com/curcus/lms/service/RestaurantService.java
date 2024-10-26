package com.curcus.lms.service;

import java.util.List;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;

public interface RestaurantService {
    List<RestaurantResponse> getRestaurants();
}
