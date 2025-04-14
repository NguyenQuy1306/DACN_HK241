package com.capstoneproject.themeal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.payos.PayOS;

@Configuration
public class PayOsConfig {
    @Bean
    public PayOS payOS() {
        String clientId = "c52168d1-0b63-47b4-ab92-09a6138f05b5";
        String apiKey = "265ad092-714c-4684-982f-7906eea50584";
        String checksumKey = "bdc07e1452e175a62a5f439e1640faf1103e2188545d16050dab43c73f65a070";
        new PayOS(clientId, apiKey, checksumKey);
        return new PayOS(clientId, apiKey, checksumKey);
    }
}
