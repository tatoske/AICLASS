# AIClass - Base de Datos

Este directorio contiene los esquemas DDL y datos semilla para la plataforma **AIClass**.

## Contenido

- **`schema.sql`**: Esquema DDL en SQL estándar compatible con **PostgreSQL y Supabase**. Incluye relaciones foráneas, constraints, checks y campos generados.
- **`seed_data.sql`**: Script de inicialización con cursos, estudiantes, notas y datos de prueba.

## Entornos Soportados

1. **H2 Database (Desarrollo / Memoria)**:
   - Configurado por defecto en el backend Spring Boot (`backend/src/main/resources/application.properties`).
   - Acceso web a la consola en `http://localhost:8080/h2-console`.
2. **PostgreSQL / Supabase (Producción)**:
   - Ejecutar `schema.sql` directamente en el SQL Editor de Supabase o mediante `psql`.
