package com.capstoneproject.themeal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.payos.PayOS;

@Configuration
public class PayOsConfig {
    @Bean
    public PayOS payOS() {
        String clientId = "09d22a9f-e92e-452d-a720-8b04ac4337be";
        String apiKey = "07bdbe11-4887-4ae2-ad34-08a0a8d16aa4";
        String checksumKey = "56f81312e215aae9ba9eaa35a895cf54e61cfb8e10cdfe3cde80343e70839162";
        new PayOS(clientId, apiKey, checksumKey);
        return new PayOS(clientId, apiKey, checksumKey);
    }
}
