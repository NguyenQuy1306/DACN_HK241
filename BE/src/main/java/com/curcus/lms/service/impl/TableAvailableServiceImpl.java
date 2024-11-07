package com.curcus.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.curcus.lms.exception.ApplicationException;
import com.curcus.lms.model.entity.TableAvailable;
import com.curcus.lms.model.mapper.TableAvailableMapper;
import com.curcus.lms.model.response.TableAvailableResponse;
import com.curcus.lms.repository.TableAvailableRepository;
import com.curcus.lms.service.TableAvailableService;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TableAvailableServiceImpl implements TableAvailableService {
    @Autowired
    private final TableAvailableRepository tableAvailableRepository;
    @Autowired
    private TableAvailableMapper tableAvailableMapper;

    public TableAvailableServiceImpl(TableAvailableRepository tableAvailableRepository) {
        this.tableAvailableRepository = tableAvailableRepository;
    }

    @Override
    @Transactional
    public TableAvailable saveWithGeneratedThuTuBan(TableAvailable tableAvailable) {
        if (tableAvailable.getMaSo().getThuTuBan() == null) {
            short newThuTuBan = generateThuTuBanForRestaurant(tableAvailable.getMaSo().getMaSoNhaHang());
            tableAvailable.getMaSo().setThuTuBan(newThuTuBan);
        }
        return tableAvailableRepository.save(tableAvailable);
    }

    private short generateThuTuBanForRestaurant(Long maSoNhaHang) {
        Short maxThuTuBan = tableAvailableRepository.findMaxThuTuBanForRestaurant(maSoNhaHang);
        return (short) ((maxThuTuBan == null ? 0 : maxThuTuBan) + 1);
    }

    @Override
    public List<TableAvailableResponse> getTableAvailableForRestaurant(Long restaurantId) {
        try {
            List<TableAvailable> tableAvailables = tableAvailableRepository.findAllTableForRestaurant(restaurantId);
            return tableAvailables.stream().map(tableAvailableMapper::toTableAvailableResponse)
                    .collect(Collectors.toList());
        } catch (

        Exception ex) {
            throw new ApplicationException();
        }
    }

}
