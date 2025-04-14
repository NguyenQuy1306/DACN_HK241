package com.capstoneproject.themeal.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFood;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFoodId;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.mapper.ComboAvailableMapper;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.response.ComboAvailableHasFoodResponse;
import com.capstoneproject.themeal.model.response.FoodResponse;
import com.capstoneproject.themeal.repository.ComboAvailableHasFoodRepository;
import com.capstoneproject.themeal.repository.ComboAvailableRepository;
import com.capstoneproject.themeal.repository.FoodRepository;
import com.capstoneproject.themeal.service.ComboAvailableService;

@Service
public class ComboAvailableServiceImpl implements ComboAvailableService {
    @Autowired
    private ComboAvailableHasFoodRepository comboAvailableHasFoodRepository;
    @Autowired
    private ComboAvailableRepository comboAvailableRepository;
    @Autowired
    private ComboAvailableMapper comboAvailableMapper;

    @Override
    public List<ComboAvailableHasFoodResponse> getAvailableCombos(Pageable pageable, Long restaurantId) {
        try {
            List<ComboAvailableHasFood> comboAvailableHasFoods = comboAvailableHasFoodRepository.findAllComboAvailable(
                    restaurantId,
                    pageable);
            return comboAvailableMapper.toComboAvailableHasFoodFinalResponse(comboAvailableHasFoods);

        } catch (Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public boolean isComboExists(Long comboId, Long restaurantId) {
        List<ComboAvailable> comboAvailables = comboAvailableRepository.findAllComboAvailable(restaurantId, comboId);
        if (comboAvailables.size() > 0) {
            return true;
        }
        return false;

    }

}
