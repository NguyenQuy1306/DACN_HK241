package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.mapper.UserMapper;
import com.capstoneproject.themeal.model.request.UserInformationRequest;
import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.model.response.UserResponse;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.CustomerService;
import com.capstoneproject.themeal.service.UserInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserInformationServiceImpl implements UserInformationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerServiceImpl customerServiceImpl;

    @Autowired
    private UserMapper userMapper;

    public CustomerResponse updateUserInformation(UserInformationRequest userRequest) {
        Optional<User> user = userRepository.findById(userRequest.getId());
        if (user.isPresent()) {
            System.out.println("==============CURRENT USER:============"+user.get());
            user.get().setHoTen(userRequest.getFullName());
            user.get().setDiaChi(userRequest.getAddress());
            user.get().setSDT(userRequest.getPhoneNumber());
            user.get().setNgaySinh(userRequest.getBirthDate());
            userRepository.save(user.get());
            return customerServiceImpl.getCustomerById(userRequest.getId()).get();
        } else {
            throw new IllegalArgumentException("Invalid user id");
        }
    }
}
