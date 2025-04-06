package com.capstoneproject.themeal.SessionAuthenticationFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

// Đảm bảo rằng các class này tồn tại trong dự án của bạn
import com.capstoneproject.themeal.model.response.LoginResponse;
import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionRegistry;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.FilterChainProxy.VirtualFilterChainDecorator;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties.Servlet;
import org.apache.catalina.core.ApplicationFilterChain;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;

@Component
public class SessionAuthenticationFilter extends OncePerRequestFilter {
    private static final String DEFAULT_AUTHORIZATION_REQUEST_ATTR_NAME = HttpSessionOAuth2AuthorizationRequestRepository.class
            .getName() + ".AUTHORIZATION_REQUEST";

    private final String sessionAttributeName = DEFAULT_AUTHORIZATION_REQUEST_ATTR_NAME;
    private static final List<String> PUBLIC_URLS = Arrays.asList("/api/v1/auth/authenticate", "/api/v1/auth/register",
            "/api/v1/auth/logout", "/api/restaurant", "/api/restaurants/.*", "/api/restaurants/*", "/api/restaurants",
            "/api/restaurants/**", "/api/restaurants", // Match any restaurant-related URL
            "/api/auth/reset-password", "/api/restaurants/recommended", "/api/restaurant-categories", "/v2/api-docs",
            "/v3/api-docs", "/v3/api-docs/swagger-config", "/swagger-resources", "/swagger-resources/.*",
            "/v2/api-docs", "/v3/api-docs", "/swagger-resources/**",
            "/swagger-ui/**", "/swagger-ui.html", "/webjars/**", "/configuration/ui", "/configuration/security",
            "/swagger-ui/.*", "/webjars/.*", "/api/food", "/api/combo", "/api/table/restaurant",
            "/elas/createOrUpdateDocument", "/elas/searchDocument", "/elas/.*", "/elas/searchByKeyword",
            "/elas/searchWithKeyword", "/elas/getDocument", "api/payments/*", "/api/rate/.*/restaurant",
            "/api/payments/create-payment-link", "/api/payments/payment-callback", "/api/payments/.*",
            "/api/payments/getOrderById", "/api/payments/deposit", "/api/payments", "/ws/*", "/ws/**",
            "/api/category/.*", "/api/category", "/api/category/*", "/api/food/uploadImage", "/api/food/delete/*",
            "/api/food/update", "/api/food/duplicate", "/api/food/search", "/api/food/category", "/api/food/.*",
            "/api/food/*", "/api/food/test-upload", "/api/food/restaurants/*/categories/*/foods/*/image",
            "/api/food/restaurants/*/categories/*", "/oauth2/authorization/infor", "/callbackOauthen2",
            "/callbackOauthen2/*", "/login", "/login/*", "/favicon.ico", "/user", "/welcome",
            "login/oauth2/code/google", "/secure", "/callbackOauth2Google");
    @Autowired
    private SessionRegistry sessionRegistry;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        System.out.println("Request URIIIIa: " + requestURI);
        if (requestURI.startsWith("/ws/")) {
            System.out.println("pass check websocket");
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("here23" + isPublicUrl(requestURI));

        if (isPublicUrl(requestURI)) {
            System.out.println("pass check session with publicURI");
            filterChain.doFilter(request, response);
            return;
        }

        HttpSession session = request.getSession(false);

        if (!isValidSession(session)) {
            sendUnauthorizedResponse(response);
            return;
        }
        updateSessionLastAccessTime(session);
        setUserInfoToRequest(request, session);
        System.out.println("pass check session with session");
        filterChain.doFilter(request, response);
    }

    private OAuth2AuthorizationRequest getAuthorizationRequest(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return (session != null) ? (OAuth2AuthorizationRequest) session.getAttribute(this.sessionAttributeName) : null;
    }

    private boolean isPublicUrl(String requestURI) {
        System.out.println("true or false:::"
                + PUBLIC_URLS.stream().anyMatch(pattern -> requestURI.matches(pattern.replace("*", ".*"))));
        // boolean isPublic = PUBLIC_URLS.stream().anyMatch(pattern ->
        // requestURI.matches(pattern))
        // || requestURI.contains("/swagger");
        boolean isPublic = PUBLIC_URLS.stream().anyMatch(requestURI::startsWith) || requestURI.contains("/swagger");
        return isPublic;
    }

    private boolean isValidSession(HttpSession session) {
        if (session == null)
            return false;
        System.out.println("JSESSIONID id: " + session.getAttribute("JSESSIONID"));
        LoginResponse userSession = (LoginResponse) session.getAttribute("JSESSIONID");

        return userSession != null && sessionRegistry.isSessionValid(session.getId());
    }

    private void updateSessionLastAccessTime(HttpSession session) {
        sessionRegistry.updateLastAccessTime(session.getId());
    }

    private void setUserInfoToRequest(HttpServletRequest request, HttpSession session) {
        LoginResponse userSession = (LoginResponse) session.getAttribute("JSESSIONID");
        request.setAttribute("currentUser", userSession);

    }

    private void sendUnauthorizedResponse(HttpServletResponse response) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"Session invalid or expired\"}");

    }
}