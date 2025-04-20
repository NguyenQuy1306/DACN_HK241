package com.capstoneproject.themeal.config;

import lombok.RequiredArgsConstructor;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionAuthenticationFilter;
import com.capstoneproject.themeal.handler.OAuth2AuthenticationSuccessHandler;
import com.capstoneproject.themeal.service.impl.CustomOidcUserService;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    @Autowired
    private SessionAuthenticationFilter sessionAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri:https://accounts.google.com}")
    private String issuer;
    private static final String[] WHITE_LIST_URL = {"/v2/api-docs", "/v3/api-docs", "/swagger-resources",
            "/swagger-ui/**", "/api/v1/auth/**", "/api/restaurants/**", "/api/orders/**", "/api/restaurant-categories",
            "/api/payments/**", "/api/behavior",
            "/user-info", "/swagger-ui/index.html#", "/api/table/restaurant", "/api/v1/auth/register", "/export/users", "/export/restaurants", "/export/ratings",
            "/api/orders/*/confirm-arrival", "/elas/**"};

    @Autowired
    void registerProvider(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider);
    }

    @Autowired
    private OAuth2AuthenticationSuccessHandler successHandler;
    @Autowired
    private CustomOidcUserService customOidcUserService;

    @Bean
    public JwtDecoderFactory<ClientRegistration> jwtDecoderFactory() {
        return clientRegistration -> {
            NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder
                    .withJwkSetUri(clientRegistration.getProviderDetails().getJwkSetUri()).build();
            JwtTimestampValidator timestampValidator = new JwtTimestampValidator(Duration.ofMinutes(5));
            jwtDecoder.setJwtValidator(
                    new DelegatingOAuth2TokenValidator<>(JwtValidators.createDefault(),
                            timestampValidator));
            return jwtDecoder;

        };
    }

    @Bean
    public Clock customClock() {
        return Clock.offset(Clock.systemUTC(), Duration.ofMinutes(3));
    }

    @Autowired
    private CustomOAuth2AuthorizationRequestResolver customAuthorizationRequestResolver;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authz -> authz
                        .requestMatchers(WHITE_LIST_URL).permitAll()
                        .requestMatchers(
                                "/v2/api-docs", "/v3/api-docs", "/swagger-resources/**",
                                "/swagger-ui/**", "/swagger-ui.html", "/webjars/**",
                                "/v3/api-docs/swagger-config", "/ws/info",
                                "/ws/info/**", "/ws/**")
                        .permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authorization -> authorization
                                .authorizationRequestResolver(
                                        customAuthorizationRequestResolver))
                        .failureHandler((request, response, exception) -> {
                            response.sendRedirect("/login?error="
                                    + URLEncoder.encode(exception.getMessage(),
                                    StandardCharsets.UTF_8));
                        })
                        .successHandler(successHandler))

                // .oauth2ResourceServer(oauth2 -> oauth2
                // .jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder()))
                // )
                .sessionManagement(session -> session
                                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Đảm bảo
                        // session
                        // được tạo
                        // nếu cần
                )
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .anonymous(anonymous -> anonymous.disable()) // Disable anonymous authentication
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(sessionAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
