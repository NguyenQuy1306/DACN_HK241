package com.capstoneproject.themeal.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import com.capstoneproject.themeal.model.request.AuthenticationRequest;
import com.capstoneproject.themeal.model.request.RegisterRequest;
import com.capstoneproject.themeal.model.response.LoginResponse;
import com.capstoneproject.themeal.model.response.UserResponse;

public interface AuthenticationService {

    UserResponse register(RegisterRequest request);

    LoginResponse authenticate(AuthenticationRequest request, HttpServletResponse response);

}