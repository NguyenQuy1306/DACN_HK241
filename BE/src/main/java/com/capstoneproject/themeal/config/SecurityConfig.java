package com.capstoneproject.themeal.config;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    @Autowired
    private SessionAuthenticationFilter sessionAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    private static final String[] WHITE_LIST_URL = {
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/v3/api-docs/swagger-config",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/api/v1/auth/**", // API for guest access
            "/api/v1/auth/logout",
            "/api/restaurants/*",
            "/api/restaurants",
            "/api/restaurant-categories",
            "/api/food",
            "/api/combo",
            "/api/orders/all",
            "/api/orders/*",
            "/api/orders",
            "/api/table/restaurant",
            "/api/rate/**",
            "/ws/*",
            "/ws/**",
            "/api/payments/*",
            "api/payments/create-payment-link",
            "/api/favorite-list/**",
            "/api/favorite-list/add-new-card/*",
            "/api/order-table/*",
            "/api/restaurant-categories",
            "/elas/createOrUpdateDocument",
            "/elas/searchDocument",
            "/elas/getDocument",
            "/elas/searchByKeyword",
            "/elas/searchWithKeyword",
            "/api/payments/create-payment-link",
            "/api/payments/payment-callback",
            "/api/payments/.*",
            "/api/payments/getOrderById",
            "/api/payments/deposit", "/api/category/**",
            "/api/category/*",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authz -> authz
                                .requestMatchers(WHITE_LIST_URL).permitAll() // Allow all access to
                                // white-listed URLs
                                .anyRequest().authenticated() // Require authentication for all other
                        // requests
                )
                .cors(cors -> {
                })
                .csrf(csrf -> csrf.disable()) // Disable CSRF (for development)
                .formLogin(form -> form.disable()) // Disable form login
                .authenticationProvider(authenticationProvider) // Add custom authentication provider
                .addFilterBefore(sessionAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
