package com.capstoneproject.themeal.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.exception.*;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.request.AuthenticationRequest;
import com.capstoneproject.themeal.model.request.RegisterRequest;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.AuthenticationService;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearerAuth")
public class AuthenticationController {
    private final AuthenticationService service;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request,
            BindingResult bindingResult) {

        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        Map<String, String> errors = new HashMap<>();

        // Validate binding result for input errors
        if (bindingResult.hasErrors()) {
            errors = bindingResult.getAllErrors().stream()
                    .collect(Collectors.toMap(
                            error -> ((FieldError) error).getField(),
                            error -> error.getDefaultMessage()));
            apiResponse.error(errors);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        try {
            // Check if email already existsdiemtichluy
            if (userRepository.timEmail(request.getEmail()).isPresent()) {
                errors.put("message", "Email has already been used");
                apiResponse.error(errors);
                return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
            }

            // Check if name already exists
            // if (userRepository.findByName(request.getName()).isPresent()) {
            // errors.put("message", "Name has already been used");
            // apiResponse.error(errors);
            // return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
            // }

            // Perform registration
            UserResponse userResponse = service.register(request);
            if (userResponse == null) {
                apiResponse.error(ResponseCode.getError(23));
                return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Email sent status (add this logic as needed)
            boolean emailSent = false;
            String successMessage = "User registered successfully";
            apiResponse.ok(userResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);

        } catch (IllegalArgumentException i) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid user role");
            apiResponse.error(error);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse<LoginResponse>> authenticate(
            @Valid @RequestBody AuthenticationRequest request,
            BindingResult bindingResult,
            HttpServletResponse response, HttpSession session) {
        System.out.println("nguyenquysssd" + request.getEmail() + request.getMatKhau());
        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>();
        Map<String, String> errors = new HashMap<>();

        // Validate input for binding errors
        if (bindingResult.hasErrors()) {
            throw new ValidationException(
                    bindingResult.getAllErrors().stream()
                            .collect(Collectors.toMap(
                                    error -> ((FieldError) error).getField(),
                                    error -> error.getDefaultMessage())));
        }

        try {
            // Authenticate user
            LoginResponse loginResponse = service.authenticate(request, response);
            session.setAttribute("", loginResponse.getMaSoNguoiDung());
            session.setAttribute("username", loginResponse.getHoTen());
            apiResponse.ok(loginResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (IncorrectPasswordException e) {
            apiResponse.error(ResponseCode.getError(9));
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            apiResponse.error(ResponseCode.getError(23));
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
