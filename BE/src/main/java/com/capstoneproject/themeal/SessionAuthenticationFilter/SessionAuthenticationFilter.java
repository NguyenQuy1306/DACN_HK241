// package com.capstoneproject.themeal.SessionAuthenticationFilter;

// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import jakarta.servlet.http.HttpSession;
// import jakarta.servlet.ServletException;
// import java.io.IOException;

// @Component
// public class SessionAuthenticationFilter extends OncePerRequestFilter {

// @Override
// protected void doFilterInternal(HttpServletRequest request,
// HttpServletResponse response, FilterChain filterChain)
// throws ServletException, IOException {

// String requestURI = request.getRequestURI();
// System.out.println("url::: " + requestURI);
// if (requestURI.startsWith("/swagger-ui") ||
// requestURI.startsWith("/v3/api-docs")
// || requestURI.startsWith("/api/v1/auth/authenticate")
// || requestURI.startsWith("/api/v1/auth/register")
// || requestURI.startsWith("/api/restaurants/recommended")
// || requestURI.startsWith("/api/restaurant-categories")) {
// filterChain.doFilter(request, response);
// return;
// }
// System.out.println("check1234");

// HttpSession session = request.getSession(false);

// // If no session or userId attribute is found, respond with 401 Unauthorized
// if (session == null || session.getAttribute("userId") == null) {
// System.out.println("check123");
// response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
// return;
// }

// filterChain.doFilter(request, response);
// }
// }
