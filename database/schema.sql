-- ==============================================================================
-- AIClass - Esquema Relacional de Base de Datos (PostgreSQL / Supabase)
-- ==============================================================================

-- 1. INSTITUCIONES Y PERIODOS ACADÉMICOS
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    nit VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    year_name VARCHAR(20) NOT NULL, -- e.g., '2026'
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- e.g., 'Primer Periodo'
    weight_percentage NUMERIC(5,2) DEFAULT 25.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- 2. USUARIOS Y PERFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(20) DEFAULT 'CC',
    document_number VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'TEACHER', 'STUDENT', 'GUARDIAN', 'PSYCHOLOGIST', 'NURSE')),
    avatar_url TEXT,
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. GESTIÓN ACADÉMICA Y CURSOS
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, -- e.g., 'Matemáticas Avanzadas'
    code VARCHAR(50) NOT NULL, -- e.g., 'MAT-10A'
    grade_level VARCHAR(20) NOT NULL, -- e.g., '10°'
    group_name VARCHAR(10) NOT NULL, -- e.g., 'A'
    teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    teacher_name VARCHAR(255),
    schedule VARCHAR(100),
    classroom VARCHAR(50),
    student_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    grade_level VARCHAR(20) NOT NULL,
    group_name VARCHAR(10) NOT NULL,
    guardian_name VARCHAR(255),
    guardian_phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS grade_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    course_name VARCHAR(255) NOT NULL,
    term VARCHAR(50) DEFAULT 'Periodo 1',
    saber_score NUMERIC(4,2) DEFAULT 0.0 CHECK (saber_score >= 0.0 AND saber_score <= 5.0),
    hacer_score NUMERIC(4,2) DEFAULT 0.0 CHECK (hacer_score >= 0.0 AND hacer_score <= 5.0),
    ser_score NUMERIC(4,2) DEFAULT 0.0 CHECK (ser_score >= 0.0 AND ser_score <= 5.0),
    final_score NUMERIC(4,2) GENERATED ALWAYS AS (ROUND((saber_score * 0.40) + (hacer_score * 0.40) + (ser_score * 0.20), 2)) STORED,
    performance_level VARCHAR(50),
    feedback TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    course_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    weight_percentage NUMERIC(5,2) DEFAULT 20.0,
    category VARCHAR(50) DEFAULT 'HACER' CHECK (category IN ('SABER', 'HACER', 'SER')),
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'LATE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. GESTIÓN DE CONDUCTA Y ASISTENCIA
CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS observer_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    author_name VARCHAR(255) NOT NULL,
    incident_date DATE NOT NULL,
    incident_type VARCHAR(50) NOT NULL CHECK (incident_type IN ('TYPE_I', 'TYPE_II', 'TYPE_III', 'MERIT')),
    description TEXT NOT NULL,
    commitments TEXT,
    guardian_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. INTELIGENCIA ARTIFICIAL Y BIENESTAR
CREATE TABLE IF NOT EXISTS strength_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    logical_score INT CHECK (logical_score >= 0 AND logical_score <= 100),
    creative_score INT CHECK (creative_score >= 0 AND creative_score <= 100),
    emotional_score INT CHECK (emotional_score >= 0 AND emotional_score <= 100),
    linguistic_score INT CHECK (linguistic_score >= 0 AND linguistic_score <= 100),
    spatial_score INT CHECK (spatial_score >= 0 AND spatial_score <= 100),
    ai_recommendation TEXT,
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS psico_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    counselor_name VARCHAR(255) NOT NULL,
    session_date DATE NOT NULL,
    topic VARCHAR(255) NOT NULL,
    observations TEXT NOT NULL,
    agreements TEXT,
    confidentiality_level VARCHAR(50) DEFAULT 'RESTRICTED'
);

-- 6. ADMINISTRACIÓN Y SERVICIOS
CREATE TABLE IF NOT EXISTS admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_name VARCHAR(255) NOT NULL,
    guardian_name VARCHAR(255) NOT NULL,
    guardian_phone VARCHAR(50) NOT NULL,
    guardian_email VARCHAR(255) NOT NULL,
    target_grade VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED', 'IN_REVIEW', 'ACCEPTED', 'REJECTED', 'ENROLLED')),
    submission_date DATE NOT NULL,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    guardian_name VARCHAR(255) NOT NULL,
    concept VARCHAR(255) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED')),
    payment_method VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS canteen_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(255) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PREPARING' CHECK (status IN ('ORDERED', 'PREPARING', 'DELIVERED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS infirmary_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(255) NOT NULL,
    grade_level VARCHAR(20) NOT NULL,
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    symptoms TEXT NOT NULL,
    medication_administered VARCHAR(255),
    disposition VARCHAR(100) DEFAULT 'RETURNED_TO_CLASS',
    nurse_name VARCHAR(255) NOT NULL,
    guardian_notified BOOLEAN DEFAULT FALSE
);

-- 7. COMUNICACIONES
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_name VARCHAR(100) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_role VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'GENERAL',
    author_name VARCHAR(255) NOT NULL,
    priority VARCHAR(50) DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
    published_date DATE NOT NULL,
    expires_date DATE
);
