package com.curcus.lms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@ComponentScan(basePackages = "com.curcus.lms")
@EnableJpaRepositories(basePackages = "com.curcus.lms.repository")
@CrossOrigin(origins = "*")
public class CurcusApplication {
	public static void main(String[] args) {
		SpringApplication.run(CurcusApplication.class, args);
	}
}