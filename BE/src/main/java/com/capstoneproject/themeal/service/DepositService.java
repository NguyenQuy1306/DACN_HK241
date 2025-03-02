package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.response.DepositResponse;

public interface DepositService {
    public DepositResponse getDeposit(Long restaurantId);
}
