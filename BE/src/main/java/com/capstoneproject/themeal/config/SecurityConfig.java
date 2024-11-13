package com.capstoneproject.themeal.config;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
        @Autowired
        // private SessionAuthenticationFilter sessionAuthenticationFilter;
        private final AuthenticationProvider authenticationProvider;

        private static final String[] WHITE_LIST_URL = {
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-ui.html",
                        "/api/v1/auth/**", // API for guest access
                        "/api/restaurants/*",
                        "/api/restaurant-categories",
                        "/api/**",
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
                                .csrf(csrf -> csrf.disable()) // Disable CSRF (for development)
                                .formLogin(form -> form.disable()) // Disable form login
                                .authenticationProvider(authenticationProvider); // Add custom authentication provider
                // .addFilterBefore(sessionAuthenticationFilter,
                // UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
