package com.capstoneproject.themeal.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComboAvailableHasFoodResponse {
    private Long comboId;
    private String comboName;
    private Long comboPrice;
    private LocalDateTime comboCreationTime;
    private List<FoodResponse> foods;
}