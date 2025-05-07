package com.capstoneproject.themeal.model.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import com.capstoneproject.themeal.model.entity.RestaurantImage;

@Data
@Getter
@Setter
public class RatesRestaurantResponse {
    private UserRateResponse userRateResponses;
    private LocalDateTime ThoiGianCapNhat;
    private Double Sao;
    private String NoiDung;
    private List<String> userImages;
}
