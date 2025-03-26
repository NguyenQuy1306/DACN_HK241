package com.capstoneproject.themeal.model.response;

import com.capstoneproject.themeal.model.entity.OrderTableHasFoodId;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class OrderTableHasFoodResponse {
    private OrderTableHasFoodId MaSo;
    private String TenMon;
    private Long Gia;
    private Short SoLuong;

}
