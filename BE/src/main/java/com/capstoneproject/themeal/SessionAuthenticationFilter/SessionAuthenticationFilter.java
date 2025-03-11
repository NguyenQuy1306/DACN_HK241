package com.capstoneproject.themeal.SessionAuthenticationFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

// Đảm bảo rằng các class này tồn tại trong dự án của bạn
import com.capstoneproject.themeal.model.response.LoginResponse;
import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionRegistry;

@Component
public class SessionAuthenticationFilter extends OncePerRequestFilter {

    private static final List<String> PUBLIC_URLS = Arrays.asList("/api/v1/auth/authenticate", "/api/v1/auth/register",
            "/api/v1/auth/logout",
            "/api/restaurant", "/api/restaurants/.*", // Match any restaurant-related URL
            "/api/auth/reset-password", "/api/restaurants/recommended", "/api/restaurant-categories",
            "/v2/api-docs", "/v3/api-docs", "/v3/api-docs/swagger-config", "/swagger-resources",
            "/swagger-resources/.*",
            "/configuration/ui", "/configuration/security", "/swagger-ui/.*", "/webjars/.*",
            "/api/food", "/api/combo", "/api/orders/all", "/api/table/restaurant", "/api/orders/*",
            "/api/orders",
            "/elas/createOrUpdateDocument", "/elas/searchDocument", "/elas/.*", "/elas/searchByKeyword",
            "/elas/searchWithKeyword",
            "/elas/getDocument",
            "api/payments/*",
            "/api/rate/.*/restaurant", "/api/payments/create-payment-link", "/api/payments/payment-callback",
            "/api/payments/.*", "/api/payments/getOrderById", "/api/payments/deposit", "/api/payments",
            "/ws/*",
            "/ws/**", "/api/category/.*", "/api/category", "/api/category/*");
    @Autowired
    private SessionRegistry sessionRegistry;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        System.out.println("Request URIIIIa: " + requestURI); // Log the request URI
        if (requestURI.startsWith("/ws/")) {
            System.out.println("pass check websocket");
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("here3323");

        System.out.println("here23" + isPublicUrl(requestURI));

        if (isPublicUrl(requestURI)) {
            System.out.println("pass check session");
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
        filterChain.doFilter(request, response);
    }

    private boolean isPublicUrl(String requestURI) {
        System.out.println("true or false:::" + PUBLIC_URLS.stream().anyMatch(requestURI::startsWith));
        // boolean isPublic = PUBLIC_URLS.stream().anyMatch(pattern ->
        // requestURI.matches(pattern))
        // || requestURI.contains("/swagger");
        boolean isPublic = PUBLIC_URLS.stream().anyMatch(requestURI::startsWith)
                || requestURI.contains("/swagger");
        return isPublic;
    }

    private boolean isValidSession(HttpSession session) {
        if (session == null)
            return false;
        LoginResponse userSession = (LoginResponse) session.getAttribute("USER_SESSION");

        return userSession != null && sessionRegistry.isSessionValid(session.getId());
    }

    private void updateSessionLastAccessTime(HttpSession session) {
        sessionRegistry.updateLastAccessTime(session.getId());
    }

    private void setUserInfoToRequest(HttpServletRequest request, HttpSession session) {
        LoginResponse userSession = (LoginResponse) session.getAttribute("USER_SESSION");
        request.setAttribute("currentUser", userSession);

    }

    private void sendUnauthorizedResponse(HttpServletResponse response) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"Session invalid or expired\"}");

    }
}