package com.curcus.lms.model.response;

import java.io.Serializable;
import java.util.Objects;
import java.util.List;

import com.curcus.lms.model.entity.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodFinalReponse implements Serializable {
    private List<FoodResponse> foodResponses;
    private CategoryResponse categoryResponse;

}
