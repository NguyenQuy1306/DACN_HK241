package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.request.TableRequest;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.entity.TableAvailableId;
import com.capstoneproject.themeal.model.mapper.TableAvailableMapper;
import com.capstoneproject.themeal.model.response.TableAvailableResponse;
import com.capstoneproject.themeal.repository.TableAvailableRepository;
import com.capstoneproject.themeal.service.TableAvailableService;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TableAvailableServiceImpl implements TableAvailableService {
    @Autowired
    private final TableAvailableRepository tableAvailableRepository;
    @Autowired
    private TableAvailableMapper tableAvailableMapper;
    @Autowired
    private RestaurantRepository restaurantRepository;

    public TableAvailableServiceImpl(TableAvailableRepository tableAvailableRepository) {
        this.tableAvailableRepository = tableAvailableRepository;
    }

    @Override
    @Transactional
    public TableAvailable saveWithGeneratedThuTuBan(TableAvailable tableAvailable) {
        if (tableAvailable.getMaSo().getThuTuBan() == null) {
//            short newThuTuBan = generateThuTuBanForRestaurant(tableAvailable.getMaSo().getMaSoNhaHang());
            short newThuTuBan = 1;

            tableAvailable.getMaSo().setThuTuBan(newThuTuBan);
        }
        return tableAvailableRepository.save(tableAvailable);
    }

//    private short generateThuTuBanForRestaurant(Long maSoNhaHang) {
//        Short maxThuTuBan = tableAvailableRepository.findMaxThuTuBanForRestaurant(maSoNhaHang);
//        return (short) ((maxThuTuBan == null ? 0 : maxThuTuBan) + 1);
//    }

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

    @Override
    public void saveTableAvailableForRestaurant(List<TableRequest> tableRequests, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant ID not found: " + restaurantId));

        List<TableAvailable> existingTables = tableAvailableRepository.findExistingTables(
                restaurant.getMaSoNhaHang(),
                tableRequests.stream().map(TableRequest::getNgay).collect(Collectors.toList()),
                tableRequests.stream().map(TableRequest::getGio).collect(Collectors.toList()),
                tableRequests.stream().map(TableRequest::getSoNguoi).collect(Collectors.toList())
//                tableRequests.stream().map(TableRequest::getSoLuong).collect(Collectors.toList())
        );


        Map<String, TableAvailable> tableMap = existingTables.stream()
                .collect(Collectors.toMap(
                        t -> t.getGio() + "_" + t.getNgay() + "_" + t.getSoNguoi(),
                        t -> t
                ));

        for (TableRequest tableRequest : tableRequests) {
            String key = tableRequest.getGio() + "_" + tableRequest.getNgay() + "_" + tableRequest.getSoNguoi();

            if (tableMap.containsKey(key)) {
                TableAvailable existingTable = tableMap.get(key);
                existingTable.setSoLuong(existingTable.getSoLuong() + tableRequest.getSoLuong());
                tableAvailableRepository.save(existingTable);
            } else {
                Short maxThuTuBan = tableAvailableRepository.findMaxThuTuBanForRestaurant(restaurantId);
                if (maxThuTuBan == null) {
                    maxThuTuBan = 1;
                } else {
                    maxThuTuBan = (short) (maxThuTuBan + 1);
                }
                TableAvailableId tableAvailableId = TableAvailableId.builder().MaSoNhaHang(restaurantId).ThuTuBan(maxThuTuBan).build();
                TableAvailable newTable = TableAvailable.builder()
                        .Gio(tableRequest.getGio())
                        .Ngay(tableRequest.getNgay())
                        .SoLuong(tableRequest.getSoLuong())
                        .SoNguoi(tableRequest.getSoNguoi())
                        .NhaHang(restaurant)
                        .MaSo(tableAvailableId)
                        .build();
                tableAvailableRepository.save(newTable);
            }
        }
    }

    @Override
    public void deleteTable(Long restaurantId, Short thuTuBan) {
        TableAvailableId tableAvailableId = new TableAvailableId(restaurantId, thuTuBan);
        if (tableAvailableRepository.existsById(tableAvailableId)) {
            tableAvailableRepository.deleteById(tableAvailableId);
        }
    }

    @Override
    public void updateCountOfTable(Long restaurantId, Short thuTuBan) {
        TableAvailableId tableAvailableId = new TableAvailableId(restaurantId, thuTuBan);
        if (tableAvailableRepository.existsById(tableAvailableId)) {
            Optional<TableAvailable> tableAvailable = tableAvailableRepository.findById(tableAvailableId);
            if (tableAvailable.isPresent()) {
                if (tableAvailable.get().getSoLuong() > 0) {
                    System.out.println("update count of table" + tableAvailable.get().getSoLuong());
                    tableAvailable.get().setSoLuong(tableAvailable.get().getSoLuong() - 1);
                    tableAvailableRepository.save(tableAvailable.get());
                } else {
                    deleteTable(restaurantId, thuTuBan);
                }
            } else {
                throw new IllegalArgumentException("Table not found");
            }
        }
    }

    @Override
    public void deleteOverdueTableAvailable() {
        tableAvailableRepository.deleteByNgayBefore(LocalDate.now());
    }
}
