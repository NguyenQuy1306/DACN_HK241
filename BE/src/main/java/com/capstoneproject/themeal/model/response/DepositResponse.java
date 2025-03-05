package com.capstoneproject.themeal.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepositResponse {
    private Long DatCocToiThieu;
    private Long NguongApDungDatCocTheoPhanTram;
    private Double PhanTramCoc;
    private Double PhanTramGiamCoc;
    private Byte KhoangThoiGianHoanCocToanBo;
    private Byte KhoangThoiGianHoanCocKhongToanBo;
}
