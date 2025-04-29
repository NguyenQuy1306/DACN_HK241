package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.request.UserInformationRequest;
import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.model.response.UserResponse;

public interface UserInformationService {
    CustomerResponse updateUserInformation(UserInformationRequest userInformationRequest);
}
