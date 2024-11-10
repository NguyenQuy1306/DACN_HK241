package com.curcus.lms.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.curcus.lms.model.entity.Category;
import com.curcus.lms.model.entity.DateTimeKey;
import com.curcus.lms.model.entity.Food;
import com.curcus.lms.model.entity.TableAvailable;
import com.curcus.lms.model.response.CategoryResponse;
import com.curcus.lms.model.response.FoodFinalReponse;
import com.curcus.lms.model.response.FoodResponse;
import com.curcus.lms.model.response.TableAvailableResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class TableAvailableMapper {

    public abstract TableAvailableResponse toTableAvailableResponse(TableAvailable tableAvailable);

    public List<Map<String, Object>> toGroupedTableAvailableResponses(List<TableAvailable> tableAvailables) {
        return tableAvailables.stream()
                .collect(Collectors.groupingBy(
                        tableAvailable -> new DateTimeKey(tableAvailable.getNgay(), tableAvailable.getGio()),
                        Collectors.mapping(this::toTableAvailableResponse, Collectors.toList())))
                .entrySet().stream()
                .map(entry -> {
                    DateTimeKey key = entry.getKey();
                    List<TableAvailableResponse> ban = entry.getValue();

                    // Tạo Map đầu ra chứa "ngay", "gio", và "ban"
                    Map<String, Object> group = new HashMap<>();
                    group.put("ngay", key.getNgay());
                    group.put("gio", key.getGio());
                    group.put("ban", ban);

                    return group;
                })
                .collect(Collectors.toList());
    }
}
