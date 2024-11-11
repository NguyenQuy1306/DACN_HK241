package com.curcus.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.curcus.lms.model.request.*;
import com.curcus.lms.model.response.*;
import com.curcus.lms.model.entity.*;
import com.curcus.lms.model.mapper.ComboAvailableMapper;
import com.curcus.lms.repository.*;
import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.service.ComboAvailableService;
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
