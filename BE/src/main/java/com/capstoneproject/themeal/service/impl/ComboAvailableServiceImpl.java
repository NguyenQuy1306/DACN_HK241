package com.capstoneproject.themeal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.mapper.ComboAvailableMapper;
import com.capstoneproject.themeal.model.request.*;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.ComboAvailableService;

import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class ComboAvailableServiceImpl implements ComboAvailableService {
    @Autowired
    private ComboAvailableHasFoodRepository comboAvailableHasFoodRepository;
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

}
