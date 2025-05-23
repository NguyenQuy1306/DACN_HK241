package com.capstoneproject.themeal.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionRegistry;
import com.capstoneproject.themeal.exception.*;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.request.AuthenticationRequest;
import com.capstoneproject.themeal.model.request.RegisterRequest;
import com.capstoneproject.themeal.model.request.UserSessionRequest;
import com.capstoneproject.themeal.model.response.*;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.AuthenticationService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

//nguyenngocquy
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")

public class AuthenticationController {
    @Lazy
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final SessionRegistry sessionRegistry;

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
            UserResponse userResponse = authenticationService.register(request);
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
            HttpServletRequest request,
            @Valid @RequestBody AuthenticationRequest authenticationRequest,
            BindingResult bindingResult) { // Đặt BindingResult ngay sau @RequestBody
        System.out.println("checksession " + "3434");
        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>();
        Map<String, String> errors = new HashMap<>();

        // Kiểm tra lỗi xác thực đầu vào
        if (bindingResult.hasErrors()) {
            throw new ValidationException(
                    bindingResult.getAllErrors().stream()
                            .collect(Collectors.toMap(
                                    error -> ((FieldError) error).getField(),
                                    error -> error.getDefaultMessage())));
        }

        try {
            LoginResponse loginResponse = authenticationService.authenticate(authenticationRequest);
            System.out.println("checksession " + "123");
            HttpSession existingSession = request.getSession(false);
            System.out.println("checksessionsds " + existingSession);

            if (existingSession != null) {
                existingSession.invalidate();
            }

            // Tạo session mới
            HttpSession newSession = request.getSession(true);
            System.out.println("checksessionxxx " + existingSession);
            newSession.setAttribute("JSESSIONID", loginResponse);
            newSession.setMaxInactiveInterval(3000); // 5 phút
            Authentication auth = new UsernamePasswordAuthenticationToken(loginResponse, null, Collections.emptyList());
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(auth);
            newSession.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
            SecurityContextHolder.setContext(securityContext);
            // Đăng ký session với registry
            sessionRegistry.registerSession(newSession.getId(), loginResponse.getMaSoNguoiDung());
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        ApiResponse<Map<String, String>> apiResponse = new ApiResponse<>();
        HttpSession session = request.getSession(false);
        if (session != null) {
            sessionRegistry.invalidateSession(session.getId());
            session.invalidate();
        }
        // Xoá cookie JSESSIONID trên trình duyệt
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // Đặt thời gian hết hạn để trình duyệt xoá cookie
        response.addCookie(cookie);
        apiResponse.ok(ResponseCode.getError(28));
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/session-info")
    public ResponseEntity<?> getSessionInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>();
        if (session != null) {
            LoginResponse userSession = (LoginResponse) session.getAttribute("JSESSIONID");
            if (userSession != null) {
                apiResponse.ok(userSession);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            }
        }
        apiResponse.error(ResponseCode.getError(26));
        return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/session-expired")
    public ResponseEntity<?> sessionExpired() {
        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>();
        apiResponse.error(ResponseCode.getError(27));
        return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
    }


}
