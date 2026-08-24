package com.aiclass.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AIClass REST API")
                        .version("1.0.0")
                        .description("API REST para la plataforma integral de gestión educativa y analítica predictiva AIClass.")
                        .contact(new Contact().name("AIClass Development Team").email("soporte@aiclass.edu"))
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }
}
