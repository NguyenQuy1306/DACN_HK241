package com.capstoneproject.themeal.service.impl;

import java.util.Optional;

import com.capstoneproject.themeal.model.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.repository.UserRepository;

@Component
public class CustomOidcUserService extends OidcUserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public CustomOidcUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        String email = oidcUser.getAttribute("email");

        if (email == null) {
            throw new OAuth2AuthenticationException("Email not found from Google");
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user = new Customer();

        if (userOptional.isEmpty()) {
            user = new User();
            user.setEmail(email);
            user.setHoTen(oidcUser.getAttribute("name"));
            user.setAuthProvider(AuthProvider.GOOGLE);
            user.setMatKhau("1");
            userRepository.save(user);
        } else {
            user = userOptional.get();

            if (user.getAuthProvider() == AuthProvider.LOCAL) {
                throw new OAuth2AuthenticationException("Email already registered with password authentication");
            }

            user.setHoTen(oidcUser.getAttribute("name"));
            userRepository.save(user);
        }

        return new CustomOidcUser(oidcUser, user);
    }

}

