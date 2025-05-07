package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.response.LoginResponse;
import com.capstoneproject.themeal.repository.UserRepository;
import com.capstoneproject.themeal.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.web.bind.annotation.RestController;

import com.capstoneproject.themeal.service.impl.CustomOidcUserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.Optional;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("")
public class Oauth2Controller {
    @Autowired
    private CustomOidcUserService customOidcUserService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestParam Long userId) {
        System.out.println("call user-info");
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        User user = userOptional.get();

        LoginResponse userSession = LoginResponse.builder()
                .UserRole("C")
                .Email(user.getEmail())
                .SDT(user.getSDT())
                .DiaChi(user.getDiaChi())
                .NgaySinh(user.getNgaySinh())
                .maSoNguoiDung(user.getMaSoNguoiDung())
                .GioiTinh(user.getGioiTinh())
                .HoTen(user.getHoTen())
                .build();
        if (userSession == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        return ResponseEntity.ok(userSession);
    }


    @GetMapping("/callbackOauth2Google")
    public Map<String, Object> home(@RequestParam Map<String, String> params) {
        // Lấy thông tin user từ SecurityContext
        System.out.println("check callbackOauth2Google");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authenticationService.getGoogleUserProfile(params.get("code"));
    }


}
