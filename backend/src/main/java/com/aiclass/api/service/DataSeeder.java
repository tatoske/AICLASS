package com.aiclass.api.service;

import com.aiclass.api.model.*;
import com.aiclass.api.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class DataSeeder implements CommandLineRunner {

    private final CourseRepository courseRepo;
    private final StudentRepository studentRepo;
    private final GradeRecordRepository gradeRepo;
    private final TaskRepository taskRepo;
    private final AttendanceRepository attendanceRepo;
    private final ObserverRepository observerRepo;
    private final StrengthRepository strengthRepo;
    private final PsicoRepository psicoRepo;
    private final AdmissionRepository admissionRepo;
    private final InvoiceRepository invoiceRepo;
    private final CanteenRepository canteenRepo;
    private final InfirmaryRepository infirmaryRepo;
    private final ChatMessageRepository chatRepo;
    private final AnnouncementRepository announcementRepo;

    public DataSeeder(CourseRepository courseRepo, StudentRepository studentRepo,
                      GradeRecordRepository gradeRepo, TaskRepository taskRepo,
                      AttendanceRepository attendanceRepo, ObserverRepository observerRepo,
                      StrengthRepository strengthRepo, PsicoRepository psicoRepo,
                      AdmissionRepository admissionRepo, InvoiceRepository invoiceRepo,
                      CanteenRepository canteenRepo, InfirmaryRepository infirmaryRepo,
                      ChatMessageRepository chatRepo, AnnouncementRepository announcementRepo) {
        this.courseRepo = courseRepo;
        this.studentRepo = studentRepo;
        this.gradeRepo = gradeRepo;
        this.taskRepo = taskRepo;
        this.attendanceRepo = attendanceRepo;
        this.observerRepo = observerRepo;
        this.strengthRepo = strengthRepo;
        this.psicoRepo = psicoRepo;
        this.admissionRepo = admissionRepo;
        this.invoiceRepo = invoiceRepo;
        this.canteenRepo = canteenRepo;
        this.infirmaryRepo = infirmaryRepo;
        this.chatRepo = chatRepo;
        this.announcementRepo = announcementRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (courseRepo.count() > 0) return;

        // 1. Cursos
        Course mat = courseRepo.save(new Course("Matemáticas y Cálculo", "MAT-10A", "10°", "A", "Prof. Carlos Mendoza", "Lun-Mie-Vie 07:00 - 08:30", "Aula 201", 28));
        Course fis = courseRepo.save(new Course("Física Cuántica y Mecánica", "FIS-10A", "10°", "A", "Prof. Elena Rostova", "Mar-Jue 09:00 - 10:30", "Lab Física", 26));
        Course len = courseRepo.save(new Course("Lengua Castellana y Literatura", "LEN-10A", "10°", "A", "Prof. Mario Vargas", "Lun-Jue 11:00 - 12:30", "Aula 104", 30));
        Course ia = courseRepo.save(new Course("Inteligencia Artificial y Robótica", "IA-11B", "11°", "B", "Ing. David Chen", "Vie 14:00 - 17:00", "Lab Maker", 22));

        // 2. Estudiantes
        Student s1 = studentRepo.save(new Student("1020304001", "Valentina Ríos Morales", "valentina.rios@aiclass.edu", "10°", "A", "Gloria Morales", "3104567890"));
        Student s2 = studentRepo.save(new Student("1020304002", "Mateo Gómez Aristizábal", "mateo.gomez@aiclass.edu", "10°", "A", "Fernando Gómez", "3117894561"));
        Student s3 = studentRepo.save(new Student("1020304003", "Sofía Castillo Mejía", "sofia.castillo@aiclass.edu", "10°", "A", "Adriana Mejía", "3156543210"));
        Student s4 = studentRepo.save(new Student("1020304004", "Santiago Navarro Pineda", "santiago.navarro@aiclass.edu", "10°", "A", "Raúl Navarro", "3209876543"));

        // 3. Notas
        gradeRepo.save(new GradeRecord(s1.getId(), s1.getFullName(), mat.getId(), mat.getName(), "Periodo 1", 4.8, 4.5, 5.0, "Excelente dominio analítico y resolución de problemas."));
        gradeRepo.save(new GradeRecord(s2.getId(), s2.getFullName(), mat.getId(), mat.getName(), "Periodo 1", 3.6, 3.8, 4.0, "Buen compromiso en talleres grupales."));
        gradeRepo.save(new GradeRecord(s3.getId(), s3.getFullName(), mat.getId(), mat.getName(), "Periodo 1", 4.2, 4.0, 4.5, "Gran participación en clase y debates."));
        gradeRepo.save(new GradeRecord(s4.getId(), s4.getFullName(), mat.getId(), mat.getName(), "Periodo 1", 2.8, 3.0, 3.5, "Requiere refuerzo en cálculo de derivadas."));

        // 4. Tareas
        taskRepo.save(new Task(mat.getId(), mat.getName(), "Taller de Derivadas e Integrales", "Ejercicios de la página 45 a 52 del libro guía.", LocalDate.now().plusDays(5), 20.0, "HACER", "PENDING"));
        taskRepo.save(new Task(fis.getId(), fis.getName(), "Informe Laboratorio Péndulo Simple", "Entrega de informe con gráficas de error y análisis físico.", LocalDate.now().plusDays(8), 25.0, "HACER", "PENDING"));
        taskRepo.save(new Task(len.getId(), len.getName(), "Ensayo de Literatura Contemporánea", "Análisis crítico de 100 Años de Soledad.", LocalDate.now().plusDays(12), 30.0, "SABER", "PENDING"));

        // 5. Asistencia
        attendanceRepo.save(new AttendanceRecord(s1.getId(), s1.getFullName(), mat.getId(), LocalDate.now(), "PRESENT", "Puntual"));
        attendanceRepo.save(new AttendanceRecord(s2.getId(), s2.getFullName(), mat.getId(), LocalDate.now(), "PRESENT", "Puntual"));
        attendanceRepo.save(new AttendanceRecord(s3.getId(), s3.getFullName(), mat.getId(), LocalDate.now(), "LATE", "Llegó 10 mins tarde con autorización"));
        attendanceRepo.save(new AttendanceRecord(s4.getId(), s4.getFullName(), mat.getId(), LocalDate.now(), "ABSENT", "Inasistencia justificada por cita médica"));

        // 6. Observador
        observerRepo.save(new ObserverRecord(s1.getId(), s1.getFullName(), "Prof. Carlos Mendoza", LocalDate.now().minusDays(2), "MERIT", "Representó con honores al colegio en las Olimpiadas Regionales de Matemáticas.", "Mención de honor en izada de bandera", true));
        observerRepo.save(new ObserverRecord(s4.getId(), s4.getFullName(), "Prof. Mario Vargas", LocalDate.now().minusDays(5), "TYPE_I", "Uso indebido de celular durante la explicación del docente.", "Estudiante se compromete a dejar el celular en el casillero.", true));

        // 7. Radar Fortalezas IA
        strengthRepo.save(new StrengthEvaluation(s1.getId(), s1.getFullName(), 94, 82, 88, 90, 78, "Perfil sobresaliente con alta afinidad hacia Ingeniería de Software, Ciencia de Datos y Liderazgo Científico."));
        strengthRepo.save(new StrengthEvaluation(s2.getId(), s2.getFullName(), 75, 96, 85, 78, 92, "Alta predisposición y talento natural en Diseño Industrial, Creatividad Visual y Producción Audiovisual."));

        // 8. Psicoorientación
        psicoRepo.save(new PsicoSession(s4.getId(), s4.getFullName(), "Dra. Marcela Silva (Psicóloga)", LocalDate.now().minusDays(1), "Técnicas de Gestión de Tiempo y Concentración", "El estudiante manifiesta sobrecarga académica en materias exactas.", "Se acuerda plan de acompañamiento quincenal y técnicas Pomodoro.", "RESTRICTED"));

        // 9. Admisiones
        admissionRepo.save(new Admission("Lucas Ramírez Cadavid", "Pedro Ramírez", "3123456789", "pedro.ramirez@gmail.com", "10°", "IN_REVIEW", LocalDate.now().minusDays(3), "Documentos completos, pendiente entrevista psicológica."));
        admissionRepo.save(new Admission("Isabella Torres Gil", "Carolina Gil", "3187654321", "carolina.gil@hotmail.com", "11°", "ACCEPTED", LocalDate.now().minusDays(7), "Aprobada por el comité directivo."));

        // 10. Finanzas / Facturación
        invoiceRepo.save(new Invoice("FAC-2026-0089", s1.getId(), s1.getFullName(), "Gloria Morales", "Pensión Mensual - Agosto 2026", 450000.0, LocalDate.now().plusDays(10), "PENDING", "PSE / Wompi"));
        invoiceRepo.save(new Invoice("FAC-2026-0090", s2.getId(), s2.getFullName(), "Fernando Gómez", "Pensión Mensual - Agosto 2026", 450000.0, LocalDate.now().minusDays(2), "PAID", "Tarjeta de Crédito"));

        // 11. Cafetería
        canteenRepo.save(new CanteenOrder("Valentina Ríos Morales", "Almuerzo Ejecutivo Saludable + Jugo Natural", 1, 14000.0, "DELIVERED"));
        canteenRepo.save(new CanteenOrder("Mateo Gómez Aristizábal", "Sándwich Gourmet de Pavo + Té Verde", 1, 9500.0, "PREPARING"));

        // 12. Enfermería
        infirmaryRepo.save(new InfirmaryVisit("Sofía Castillo Mejía", "10° A", "Cefalea leve y mareo tras clase de educación física.", "Reposo 20 minutos e hidratación oral.", "RETURNED_TO_CLASS", "Enf. Patricia Londoño", true));

        // 13. Chat
        chatRepo.save(new ChatMessage("general", "Prof. Carlos Mendoza", "TEACHER", "Estimados profesores, recuerden subir las notas del primer corte antes del viernes."));
        chatRepo.save(new ChatMessage("general", "Dra. Marcela Silva", "PSYCHOLOGIST", "Iniciamos la semana de salud mental con talleres de mindfulness en todos los salones."));

        // 14. Comunicados
        announcementRepo.save(new Announcement("Reunión General de Acudientes - Cierre Periodo 1", "Se convoca cordialmente a todos los acudientes a la entrega de informes de mitad de año.", "INSTITUCIONAL", "Rectoría AIClass", "HIGH", LocalDate.now()));
        announcementRepo.save(new Announcement("Feria de Robótica e Innovación Tecnológica 2026", "Abiertas las postulaciones de proyectos para la muestra de ciencia de fin de año.", "ACADÉMICO", "Coordinación de Innovación", "NORMAL", LocalDate.now().minusDays(1)));
    }
}
