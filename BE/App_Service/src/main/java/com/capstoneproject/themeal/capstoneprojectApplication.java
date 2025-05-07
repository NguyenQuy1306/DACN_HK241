package com.capstoneproject.themeal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.github.cdimascio.dotenv.Dotenv;

import java.nio.file.Paths;
import java.nio.file.Path;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = "com.capstoneproject.themeal")
@EnableJpaRepositories(basePackages = "com.capstoneproject.themeal.repository")
public class capstoneprojectApplication {
    public static void main(String[] args) {
        // System.out.println("Current working directory: " +
        // System.getProperty("user.dir"));
        // Path baseDir = Paths.get("../BE").toAbsolutePath().normalize();
        // System.out.println("Resolved .env directory: " + baseDir);
        // Dotenv dotenv = Dotenv.configure()
        // .directory("../BE")
        // .load();

        // dotenv.entries().forEach(entry -> {
        // System.setProperty(entry.getKey(), entry.getValue());
        // });

        // System.out.println("MAIL_HOST = " + System.getenv("MAIL_HOST"));

        SpringApplication.run(capstoneprojectApplication.class, args);
    }
}