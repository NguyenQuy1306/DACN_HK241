package com.curcus.lms.service.impl;

import com.curcus.lms.exception.*;
import com.curcus.lms.model.entity.*;
import com.curcus.lms.model.mapper.UserMapper;
import com.curcus.lms.model.request.AuthenticationRequest;
import com.curcus.lms.model.request.RegisterRequest;
import com.curcus.lms.model.response.LoginResponse;
import com.curcus.lms.model.response.ResponseCode;
import com.curcus.lms.model.response.UserResponse;

import com.curcus.lms.repository.UserRepository;
import com.curcus.lms.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserResponse register(RegisterRequest request) {
        try {
            User user = switch (request.getUserRole().toUpperCase()) {
                case "O" -> new OwnerRestaurant();
                case "C" -> new Customer();
                default -> throw new IllegalArgumentException("Invalid user role: " + request.getUserRole());
            };
            user.setHoTen(request.getHoTen());
            user.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
            user.setEmail(request.getEmail());
            user.setDiaChi(request.getDiaChi());
            user.setGioiTinh(request.getGioiTinh());
            user.setSDT(request.getSDT());

            return userMapper.toUserResponse(repository.save(user));

        } catch (ApplicationException e) {
            throw e;
        }
    }

    @Override
    public LoginResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {

        var user = repository.timEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Account does not exist"));
        // if (!user.isActivated())
        // throw new InactivatedUserException("Account has not been activated");
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getMatKhau()));
        } catch (BadCredentialsException e) {
            throw new IncorrectPasswordException("Incorrect password");
        }

        var userDetails = UserDetailsImpl.builder()
                .user(user)
                .role(switch (user.getDiscriminatorValue()) {
                    case UserRole.Role.CUSTOMER -> Role.CUSTOMER;
                    case UserRole.Role.OWNER -> Role.OWNER;
                    case UserRole.Role.ADMIN -> Role.ADMIN;
                    default -> throw new ValidationException("Invalid Role");
                })
                .build();

        return LoginResponse.builder()
                .maSoNguoiDung(user.getMaSoNguoiDung())
                .UserRole(user.getDiscriminatorValue())
                .HoTen(user.getHoTen())
                .Email(user.getEmail())
                .SDT(user.getSDT())
                .DiaChi(user.getDiaChi())
                .NgaySinh(user.getNgaySinh())
                .GioiTinh(user.getGioiTinh())
                .build();
    }

}
