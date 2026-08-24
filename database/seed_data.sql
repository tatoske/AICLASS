-- ==============================================================================
-- AIClass - Datos Semilla Iniciales (Seed Data)
-- ==============================================================================

-- Cursos Demo
INSERT INTO courses (id, name, code, grade_level, group_name, teacher_name, schedule, classroom, student_count)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Matemáticas y Cálculo', 'MAT-10A', '10°', 'A', 'Prof. Carlos Mendoza', 'Lun-Mie-Vie 07:00 - 08:30', 'Aula 201', 28),
('22222222-2222-2222-2222-222222222222', 'Física Cuántica y Mecánica', 'FIS-10A', '10°', 'A', 'Prof. Elena Rostova', 'Mar-Jue 09:00 - 10:30', 'Lab Física', 26),
('33333333-3333-3333-3333-333333333333', 'Lengua Castellana y Literatura', 'LEN-10A', '10°', 'A', 'Prof. Mario Vargas', 'Lun-Jue 11:00 - 12:30', 'Aula 104', 30),
('44444444-4444-4444-4444-444444444444', 'Inteligencia Artificial y Robótica', 'IA-11B', '11°', 'B', 'Ing. David Chen', 'Vie 14:00 - 17:00', 'Lab Maker', 22);

-- Estudiantes Demo
INSERT INTO students (id, document_number, full_name, email, grade_level, group_name, guardian_name, guardian_phone, status)
VALUES
('aaaaaaa1-1111-1111-1111-111111111111', '1020304001', 'Valentina Ríos Morales', 'valentina.rios@aiclass.edu', '10°', 'A', 'Gloria Morales', '3104567890', 'ACTIVE'),
('aaaaaaa2-2222-2222-2222-222222222222', '1020304002', 'Mateo Gómez Aristizábal', 'mateo.gomez@aiclass.edu', '10°', 'A', 'Fernando Gómez', '3117894561', 'ACTIVE'),
('aaaaaaa3-3333-3333-3333-333333333333', '1020304003', 'Sofía Castillo Mejía', 'sofia.castillo@aiclass.edu', '10°', 'A', 'Adriana Mejía', '3156543210', 'ACTIVE'),
('aaaaaaa4-4444-4444-4444-444444444444', '1020304004', 'Santiago Navarro Pineda', 'santiago.navarro@aiclass.edu', '10°', 'A', 'Raúl Navarro', '3209876543', 'ACTIVE');

-- Planilla de Notas (Gradebook)
INSERT INTO grade_records (id, student_id, student_name, course_id, course_name, term, saber_score, hacer_score, ser_score, performance_level, feedback)
VALUES
('g1111111-1111-1111-1111-111111111111', 'aaaaaaa1-1111-1111-1111-111111111111', 'Valentina Ríos Morales', '11111111-1111-1111-1111-111111111111', 'Matemáticas y Cálculo', 'Periodo 1', 4.8, 4.5, 5.0, 'SUPERIOR', 'Excelente dominio analítico y resolución de problemas.'),
('g2222222-2222-2222-2222-222222222222', 'aaaaaaa2-2222-2222-2222-222222222222', 'Mateo Gómez Aristizábal', '11111111-1111-1111-1111-111111111111', 'Matemáticas y Cálculo', 'Periodo 1', 3.6, 3.8, 4.0, 'ALTO', 'Buen compromiso en talleres grupales.'),
('g3333333-3333-3333-3333-333333333333', 'aaaaaaa3-3333-3333-3333-333333333333', 'Sofía Castillo Mejía', '11111111-1111-1111-1111-111111111111', 'Matemáticas y Cálculo', 'Periodo 1', 4.2, 4.0, 4.5, 'ALTO', 'Gran participación en clase.'),
('g4444444-4444-4444-4444-444444444444', 'aaaaaaa4-4444-4444-4444-444444444444', 'Santiago Navarro Pineda', '11111111-1111-1111-1111-111111111111', 'Matemáticas y Cálculo', 'Periodo 1', 2.8, 3.0, 3.5, 'BÁSICO', 'Requiere refuerzo en cálculo de integrales.');

-- Tareas
INSERT INTO tasks (id, course_id, course_name, title, description, due_date, weight_percentage, category, status)
VALUES
('t1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Matemáticas y Cálculo', 'Taller de Derivadas e Integrales', 'Ejercicios de la página 45 a 52 del libro guía.', '2026-09-05', 20.0, 'HACER', 'PENDING'),
('t2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Física Cuántica y Mecánica', 'Informe Laboratorio Péndulo Simple', 'Entrega de gráfica de error y cálculo de gravedad.', '2026-09-10', 25.0, 'HACER', 'PENDING');

-- Radar IA de Fortalezas
INSERT INTO strength_evaluations (id, student_id, student_name, logical_score, creative_score, emotional_score, linguistic_score, spatial_score, ai_recommendation)
VALUES
('s1111111-1111-1111-1111-111111111111', 'aaaaaaa1-1111-1111-1111-111111111111', 'Valentina Ríos Morales', 94, 82, 88, 90, 78, 'Perfil de alto potencial en Ingeniería de Software, Ciencia de Datos y Liderazgo de Proyectos.'),
('s2222222-2222-2222-2222-222222222222', 'aaaaaaa2-2222-2222-2222-222222222222', 'Mateo Gómez Aristizábal', 75, 96, 85, 78, 92, 'Alta afinidad con Diseño Industrial, Arquitectura Digital y Animación 3D.');

-- Comunicados Oficiales
INSERT INTO announcements (id, title, content, category, author_name, priority, published_date)
VALUES
('a1111111-1111-1111-1111-111111111111', 'Reunión General de Acudientes - Cierre Periodo 1', 'Se convoca a todos los padres de familia este viernes a las 18:00 hrs en el auditorio principal.', 'INSTITUCIONAL', 'Rectoría AIClass', 'HIGH', '2026-08-25'),
('a2222222-2222-2222-2222-222222222222', 'Feria de Ciencia y Tecnología 2026', 'Inscripciones abiertas para los semilleros de robótica e inteligencia artificial.', 'ACADÉMICO', 'Coordinación Académica', 'NORMAL', '2026-08-28');
