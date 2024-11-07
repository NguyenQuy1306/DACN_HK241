package com.curcus.lms.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.curcus.lms.model.entity.Category;
import com.curcus.lms.model.entity.Food;
import com.curcus.lms.model.entity.TableAvailable;
import com.curcus.lms.model.response.CategoryResponse;
import com.curcus.lms.model.response.FoodFinalReponse;
import com.curcus.lms.model.response.FoodResponse;
import com.curcus.lms.model.response.TableAvailableResponse;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class TableAvailableMapper {

    public abstract TableAvailableResponse toTableAvailableResponse(TableAvailable tableAvailable);

}
