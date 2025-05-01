package com.capstoneproject.themeal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.payos.PayOS;

@Configuration
public class PayOsConfig {
    @Value("${client.id}")
    private String clientId;
    @Value("${apiKey}")
    private String apiKey;
    @Value("${checksumKey}")
    private String checksumKey;

    @Bean
    public PayOS payOS() {

        new PayOS(clientId, apiKey, checksumKey);
        return new PayOS(clientId, apiKey, checksumKey);
    }
}
