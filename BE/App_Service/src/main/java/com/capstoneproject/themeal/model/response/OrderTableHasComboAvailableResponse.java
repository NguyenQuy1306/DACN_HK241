package com.capstoneproject.themeal.model.response;

import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailableId;
import com.capstoneproject.themeal.model.entity.OrderTableHasFoodId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTableHasComboAvailableResponse {
    private OrderTableHasFoodId maSo;
    private String tenCombo;
    private Long giaCombo;
    private Short soLuong;



    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoDatBan")
    @JoinColumn(name = "MaSoDatBan")
    private OrderTable DonDatBan;
}