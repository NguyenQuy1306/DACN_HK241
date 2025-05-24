package com.capstoneproject.themeal.model.response;

import com.capstoneproject.themeal.model.entity.OrderTableHasFoodId;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTableHasFoodResponse {
    private OrderTableHasFoodId MaSo;
    private String TenMon;
    private Long Gia;
    private Short SoLuong;

}
