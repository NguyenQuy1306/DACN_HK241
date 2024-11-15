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

    private static final List<String> PUBLIC_URLS = Arrays.asList(
            "/api/v1/auth/authenticate",
            "/api/v1/auth/register",
            "/api/restaurant",
            "/api/restaurants/*",
            "/api/auth/reset-password",
            "/api/restaurants/recommended",
            "/api/restaurant-categories",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**");

    @Autowired
    private SessionRegistry sessionRegistry;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        System.out.println("Request URI: " + requestURI); // Log the request URI
        if (isPublicUrl(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        HttpSession session = request.getSession(false);
        System.out.println("fixbugai1111112323232");
        if (!isValidSession(session)) {
            System.out.println("Request URIaaa: " + requestURI);
            sendUnauthorizedResponse(response);
            return;
        }
        System.out.println("fixbugai111111");
        updateSessionLastAccessTime(session);
        System.out.println("fixbugaiuyuyy");
        setUserInfoToRequest(request, session);
        System.out.println("fixbugaaaaâd1223aaa");
        filterChain.doFilter(request, response);
    }

    private boolean isPublicUrl(String requestURI) {
        System.out.println("true or false:::" + PUBLIC_URLS.stream().anyMatch(requestURI::startsWith));
        return PUBLIC_URLS.stream().anyMatch(requestURI::startsWith) || requestURI.contains("/swagger");
    }

    private boolean isValidSession(HttpSession session) {
        if (session == null)
            return false;
        System.out.println("fixbug");
        LoginResponse userSession = (LoginResponse) session.getAttribute("USER_SESSION");
        System.out.println("fixbugaaaaaaa");

        return userSession != null && sessionRegistry.isSessionValid(session.getId());
    }

    private void updateSessionLastAccessTime(HttpSession session) {
        sessionRegistry.updateLastAccessTime(session.getId());
    }

    private void setUserInfoToRequest(HttpServletRequest request, HttpSession session) {
        System.out.println("fixbug23");
        LoginResponse userSession = (LoginResponse) session.getAttribute("USER_SESSION");
        request.setAttribute("currentUser", userSession);
        System.out.println("fixbugaaa");

    }

    private void sendUnauthorizedResponse(HttpServletResponse response) throws IOException {
        System.out.println("fixbug423");

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"Session invalid or expired\"}");
        System.out.println("fixbugaaa123123");

    }
}