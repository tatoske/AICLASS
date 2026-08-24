# AIClass - Documentación Técnica y Manual de Replicación

Este documento detalla la arquitectura, tecnologías, módulos y los pasos necesarios para desplegar y replicar la plataforma **AIClass**.

---

## 1. Arquitectura del Sistema

AIClass está diseñado con una arquitectura **Cliente-Servidor (Frontend-Backend)**, separando la interfaz de usuario de la lógica de negocio y los datos.

```
AIClass/
├── backend/                  # Backend Principal (Java 17+ / Spring Boot 3.x / JPA / H2)
├── copiaback/                # Backend Alternativo (Python 3.10+ / FastAPI / Uvicorn)
├── frontend/                 # Frontend Cliente (React 18 / Vite / TypeScript / Tailwind)
├── database/                 # Esquemas SQL (PostgreSQL, Supabase, H2) y Semillas
└── DOCUMENTACION_TECNICA.md  # Este manual
```

### 1.1. Backend Principal (Java Spring Boot)
- **Ruta:** Directorio `backend/`
- **Framework:** Spring Boot 3.2.x (Java 17+)
- **Servidor Web:** Tomcat embebido (Corriendo en el puerto `8080`)
- **Base de Datos:** H2 Database (En memoria para desarrollo). 
- **ORM:** Spring Data JPA / Hibernate.
- **Documentación de API:** SpringDoc OpenAPI (Swagger UI expuesto en `http://localhost:8080/swagger-ui.html` y `/api-docs`).

### 1.2. Backend Alternativo (Python FastAPI)
- **Ruta:** Directorio `copiaback/`
- **Framework:** FastAPI (Python 3.10+)
- **Servidor Web:** Uvicorn (Corriendo en el puerto `8000`)
- **Características:** Contiene la misma lógica de negocio, módulos y rutas estructuradas en el paquete `app.routers`. Posee auto-documentación vía `http://localhost:8000/docs`.

### 1.3. Frontend (Cliente API)
- **Ruta:** Directorio `frontend/`
- **Framework:** React 18
- **Herramienta de Construcción:** Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + Lucide Icons
- **Enrutamiento:** React Router DOM
- **Cliente HTTP:** Axios (Configurado para apuntar a `http://localhost:8080/api` o `http://localhost:8000/api`)

---

## 2. Módulos y Funcionalidades (API REST)

El backend expone todos los módulos de gestión escolar organizados temáticamente:

1. **Gestión Académica**
   - `/api/courses`: Asignación académica de grupos, horarios y materias.
   - `/api/gradebook`: CRUD de notas, cálculo de ponderados (Saber 40%, Hacer 40%, Ser 20%) y nivel de desempeño.
   - `/api/tasks`: Asignación de deberes, ponderaciones y control de estados.

2. **Gestión de Estudiantes y Conducta**
   - `/api/attendance`: Registro de ausencias, retardos, asistencias y justificaciones.
   - `/api/observer`: Registro disciplinario de estudiantes (faltas leves/graves, méritos y compromisos).

3. **Herramientas de Inteligencia Artificial y Bienestar**
   - `/api/strengths`: Radar de Fortalezas (Lógica, Creatividad, Inteligencia Emocional, Lingüística, etc.).
   - `/api/psico`: Registro confidencial de sesiones de apoyo psicológico y bienestar.

4. **Administración y Servicios**
   - `/api/admissions`: Control del flujo de matrículas y postulaciones.
   - `/api/finance`: Gestión de facturas escolares y estados de cuenta (Cobros, impuestos, nómina básica).
   - `/api/canteen`: Monedero digital y pedidos del restaurante/cafetería escolar.
   - `/api/infirmary`: Registro de visitas médicas al dispensario y medicamentos administrados.
   - `/api/inventory`: Control de recursos físicos, salones y bienes institucionales.

5. **Comunicaciones y Dashboards**
   - `/api/chat`: Centro de mensajería interno entre docentes, directivos y acudientes. Asistente virtual integrado.
   - `/api/announcements`: Cartelera oficial de circulares y comunicados masivos.
   - `/api/dashboards`: Tableros estadísticos para toma de decisiones (Rectoría).

6. **Gestión de Usuarios, Roles y Transición (Ciclo de Vida)**
   - `/api/users`: Creación exhaustiva de usuarios (demografía completa), asignación de roles y permisos granulares. Formularios dinámicos según perfil (Docente, Estudiante, Administrativo).
   - `/api/enrollment`: Módulo de matrícula y pre-matrícula automática. Transición de usuarios (promoción de grado o periodo lectivo) y gestión de reprobados.
   - `/api/reports`: Extracción e importación de datos (sábanas), generación de boletines, paz y salvos, y carnets.

---

## 3. Guía de Replicación y Despliegue Local

### Requisitos Previos
- **Java Development Kit (JDK):** Versión 17 o superior.
- **Node.js:** Versión 18 o superior (Incluye `npm`).
- **Python:** Versión 3.10 o superior (Solo para el backend alternativo).

### Paso 1: Levantar el Backend (Java)
1. Abrir terminal en la carpeta `backend/`.
2. Ejecutar:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   *(O ejecutar `run.bat`)*
3. Verificar en `http://localhost:8080/swagger-ui.html`.
4. Para la consola H2: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:aiclassdb`, Usuario: `sa`, Contraseña en blanco).

### Paso 2: Levantar el Frontend (React)
1. Abrir terminal en la carpeta `frontend/`.
2. Instalar dependencias y correr:
   ```bash
   npm install
   npm run dev
   ```
3. Visitar `http://localhost:5173`.

### (Opcional) Paso 3: Usar el Backend Alternativo (Python)
1. Abrir terminal en la carpeta `copiaback/`.
2. Instalar requerimientos y levantar servidor:
   ```bash
   pip install -r requirements.txt
   python main.py
   ```
3. Backend disponible en `http://localhost:8000` con documentación interactiva en `http://localhost:8000/docs`.
