package com.siri.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SiriApplication {
    public static void main(String[] args) {
        SpringApplication.run(SiriApplication.class, args);
        System.out.println("\n==============================================");
        System.out.println("  🌟 SIRI PLATFORM is running!");
        System.out.println("  Open: http://localhost:8080");
        System.out.println("==============================================\n");
    }
}
