package com.capstoneproject.themeal.model.response;

import java.io.Serializable;
import java.util.Objects;

import com.capstoneproject.themeal.model.entity.Category;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodFinalReponse implements Serializable {
    private List<FoodResponse> foodResponses;
    private CategoryResponse categoryResponse;

}
