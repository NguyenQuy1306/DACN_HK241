package com.capstoneproject.themeal.config;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.capstoneproject.themeal.model.response.LoginResponse;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@Component
public class CustomOAuth2AuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {
    private final DefaultOAuth2AuthorizationRequestResolver defaultResolver;

    public CustomOAuth2AuthorizationRequestResolver(
            ClientRegistrationRepository clientRegistrationRepository) {
        this.defaultResolver = new DefaultOAuth2AuthorizationRequestResolver(
                clientRegistrationRepository,
                OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI);
    }

    @Override
    public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // Kiểm tra SecurityContext được lưu trong session
            Object context = session.getAttribute("SPRING_SECURITY_CONTEXT");
            String requestURI = request.getRequestURI();
            if (context != null && requestURI != null && !requestURI.startsWith("/login/oauth2/code/")) {
                return null; // Nếu đã có SecurityContext, skip OAuth2
            }
        }
        return defaultResolver.resolve(request);
    }

    @Override
    public OAuth2AuthorizationRequest resolve(
            HttpServletRequest request, String clientRegistrationId) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // Kiểm tra SecurityContext được lưu trong session
            Object context = session.getAttribute("SPRING_SECURITY_CONTEXT");
            if (context != null) {
                return null; // Nếu đã có SecurityContext, skip OAuth2
            }
        }
        return defaultResolver.resolve(request, clientRegistrationId);
    }

}
