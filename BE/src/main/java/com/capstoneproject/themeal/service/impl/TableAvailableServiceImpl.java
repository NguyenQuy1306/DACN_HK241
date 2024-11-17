package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.entity.TableAvailableId;
import com.capstoneproject.themeal.model.mapper.TableAvailableMapper;
import com.capstoneproject.themeal.model.response.TableAvailableResponse;
import com.capstoneproject.themeal.repository.TableAvailableRepository;
import com.capstoneproject.themeal.service.TableAvailableService;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Map;
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
    public List<Map<String, Object>> getTableAvailableForRestaurant(Long restaurantId) {
        try {
            List<TableAvailable> tableAvailables = tableAvailableRepository.findAllTableForRestaurant(restaurantId);
            // return
            // tableAvailables.stream().map(tableAvailableMapper::toTableAvailableResponse)
            // .collect(Collectors.toList());
            return tableAvailableMapper.toGroupedTableAvailableResponses(tableAvailables);
        } catch (

        Exception ex) {
            throw new ApplicationException();
        }
    }

    @Override
    public boolean isTableExists(Short tableId, Long restaurantId) {
        TableAvailableId tableAvailableId = new TableAvailableId(restaurantId, tableId);
        return tableAvailableRepository.existsById(tableAvailableId);
    }

}
