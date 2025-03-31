package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.exception.*;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.mapper.UserMapper;
import com.capstoneproject.themeal.model.request.AuthenticationRequest;
import com.capstoneproject.themeal.model.request.RegisterRequest;
import com.capstoneproject.themeal.model.response.LoginResponse;
import com.capstoneproject.themeal.model.response.ResponseCode;
import com.capstoneproject.themeal.model.response.UserResponse;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationCodeGrantFilter;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
    private static final String CLIENT_ID = "142229183760-20ifo7r71hsn1sdbs8r86n4i61qitm4g.apps.googleusercontent.com";
    private static final String CLIENT_SECRET = "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";
    private static final String REDIRECT_URI = "http://localhost:8080/callbackOauth2Google";

    private final RestTemplate restTemplate = new RestTemplate();
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
            user.setAuthProvider(AuthProvider.LOCAL);
            user.setSDT(request.getSDT());

            return userMapper.toUserResponse(repository.save(user));

        } catch (ApplicationException e) {
            throw e;
        }
    }

    @Override
    public LoginResponse authenticate(AuthenticationRequest request) {

        var user = repository.timEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("Account does not exist"));
        // if (!user.isActivated())
        // throw new InactivatedUserException("Account has not been activated");
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getMatKhau()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException e) {
            throw new IncorrectPasswordException("Incorrect password");
        }

        var userDetails = UserDetailsImpl.builder().user(user).role(switch (user.getDiscriminatorValue()) {
            case UserRole.Role.CUSTOMER -> Role.CUSTOMER;
            case UserRole.Role.OWNER -> Role.OWNER;
            case UserRole.Role.ADMIN -> Role.ADMIN;
            default -> throw new ValidationException("Invalid Role");
        }).build();

        return LoginResponse.builder().maSoNguoiDung(user.getMaSoNguoiDung()).UserRole(user.getDiscriminatorValue()).HoTen(user.getHoTen()).Email(user.getEmail()).SDT(user.getSDT()).DiaChi(user.getDiaChi()).NgaySinh(user.getNgaySinh()).GioiTinh(user.getGioiTinh()).build();
    }

    public String getAccessToken(String code) {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("code", code);
        requestBody.add("client_id", CLIENT_ID);
        requestBody.add("client_secret", CLIENT_SECRET);
        requestBody.add("redirect_uri", REDIRECT_URI);
        requestBody.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(GOOGLE_TOKEN_URL, HttpMethod.POST, requestEntity, Map.class);
        Map<String, Object> responseBody = response.getBody();

        if (responseBody != null && responseBody.containsKey("access_token")) {
            return responseBody.get("access_token").toString();
        }

        return null;
    }

    @Override
    public Map<String, Object> getGoogleUserProfile(String code) {
        String accessToken = getAccessToken(code);
        if (accessToken == null) {
            throw new RuntimeException("Failed to retrieve access token");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(GOOGLE_USER_INFO_URL, HttpMethod.GET, entity, Map.class);

        return response.getBody();
    }

}
