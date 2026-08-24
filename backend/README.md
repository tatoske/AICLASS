# AIClass - Backend Principal (Java Spring Boot)

Servidor backend oficial para **AIClass**, construido sobre **Spring Boot 3.2.x**, **Spring Data JPA**, **H2 Database** y **SpringDoc OpenAPI (Swagger)**.

## Requisitos
- **JDK 17** o superior
- **Maven 3.8+** (o usar `mvnw.cmd`)

## Ejecución Rápida
```bash
# En Windows:
.\mvnw.cmd spring-boot:run

# O hacer doble clic en:
run.bat
```

## Servicios y Rutas Clave
- **Servidor Base:** `http://localhost:8080`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON:** `http://localhost:8080/api-docs`
- **Consola H2 Database:** `http://localhost:8080/h2-console`
  - *JDBC URL:* `jdbc:h2:mem:aiclassdb`
  - *User:* `sa`
  - *Password:* (dejar vacío)
