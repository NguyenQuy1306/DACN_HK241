package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.model.entity.Deposit;
import com.capstoneproject.themeal.model.response.DepositResponse;
import com.capstoneproject.themeal.repository.DepositRepository;
import com.capstoneproject.themeal.service.DepositService;

@Service
public class DepositServiceImpl implements DepositService {
    @Autowired
    private DepositRepository depositRepository;

    public DepositResponse getDeposit(Long restaurantId) {
        Deposit deposit = depositRepository.findDepositByRestaurantId(restaurantId);
        if (deposit == null) {
            throw new ApplicationException("No exist deposit policy");
        }
        return DepositResponse.builder()
                .DatCocToiThieu(deposit.getDatCocToiThieu())
                .NguongApDungDatCocTheoPhanTram(deposit.getNguongApDungDatCocTheoPhanTram())
                .PhanTramCoc(deposit.getPhanTramCoc())
                .KhoangThoiGianHoanCocKhongToanBo(deposit.getKhoangThoiGianHoanCocKhongToanBo())
                .KhoangThoiGianHoanCocToanBo(deposit.getKhoangThoiGianHoanCocToanBo())
                .PhanTramGiamCoc(deposit.getPhanTramGiamCoc())
                .build();
    }
}
