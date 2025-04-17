package com.capstoneproject.themeal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = "com.capstoneproject.themeal")
@EnableJpaRepositories(basePackages = "com.capstoneproject.themeal.repository")
public class capstoneprojectApplication {
    public static void main(String[] args) {
        SpringApplication.run(capstoneprojectApplication.class, args);
    }
}