package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.exception.ValidationException;
import com.capstoneproject.themeal.model.entity.OrderTableHasFood;
import com.capstoneproject.themeal.model.request.ClickEvent;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.request.UserInformationRequest;
import com.capstoneproject.themeal.model.response.ApiResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.model.response.UserResponse;
import com.capstoneproject.themeal.service.impl.UserInformationServiceImpl;
import com.cloudinary.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.service.impl.CustomerServiceImpl;

import java.util.Optional;

@RestController
@RequestMapping("api/customer")
public class CustomerController {
    @Autowired
    CustomerServiceImpl customerService;
    @Autowired
    private UserInformationServiceImpl userInformationServiceImpl;

    @GetMapping("/{customerId}")
    public Optional<CustomerResponse> getCustomerById(@PathVariable Long customerId) {
        return customerService.getCustomerById(customerId);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<CustomerResponse>> updateCustomerInformation(@RequestBody UserInformationRequest userInformationRequest) {
        ApiResponse<CustomerResponse> apiResponse = new ApiResponse<>();
        try {
            CustomerResponse userResponse = userInformationServiceImpl.updateUserInformation(userInformationRequest);
            apiResponse.ok(userResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException e) {
            apiResponse.error(ResponseCode.getError(10));
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/trackUserBehavior")
    public ResponseEntity<ApiResponse<?>> trackUserBehavior(@RequestBody ClickEvent clickEvent) {

        ApiResponse<OrderTableHasFood> apiResponse = new ApiResponse<>();
        try {
            System.out.println("User " + clickEvent.getUserId() + " clicked restaurant " + clickEvent.getRestaurantId());
            customerService.trackUserBehavior(clickEvent);
        } catch (NotFoundException e) {
            apiResponse.error(ResponseCode.getError(10));
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        } catch (ValidationException e) {
            apiResponse.error(ResponseCode.getError(1));
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
