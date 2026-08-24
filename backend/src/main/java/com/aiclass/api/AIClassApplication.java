package com.aiclass.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AIClassApplication {

    public static void main(String[] args) {
        SpringApplication.run(AIClassApplication.class, args);
        System.out.println("=================================================");
        System.out.println(">> AIClass Backend iniciado exitosamente en http://localhost:8080");
        System.out.println(">> Swagger UI disponible en http://localhost:8080/swagger-ui.html");
        System.out.println(">> Consola H2 disponible en http://localhost:8080/h2-console");
        System.out.println("=================================================");
    }
}
