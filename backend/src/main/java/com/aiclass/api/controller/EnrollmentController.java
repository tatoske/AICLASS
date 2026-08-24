package com.aiclass.api.controller;

import com.aiclass.api.model.AcademicPeriod;
import com.aiclass.api.model.Enrollment;
import com.aiclass.api.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
@CrossOrigin(origins = "*")
@Tag(name = "Enrollment (Matrícula y Transición)", description = "Módulo de matrícula y pre-matrícula automática. Transición de estudiantes entre periodos lectivos")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/periods")
    @Operation(summary = "Obtener todos los periodos académicos")
    public List<AcademicPeriod> getAllPeriods() {
        return enrollmentService.getAllPeriods();
    }

    @PostMapping("/periods")
    @Operation(summary = "Crear un nuevo periodo académico")
    public AcademicPeriod createPeriod(@RequestBody AcademicPeriod period) {
        return enrollmentService.createPeriod(period);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las matrículas")
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/period/{periodId}")
    @Operation(summary = "Obtener matrículas de un periodo específico")
    public List<Enrollment> getEnrollmentsByPeriod(@PathVariable Long periodId) {
        return enrollmentService.getEnrollmentsByPeriod(periodId);
    }

    @PostMapping
    @Operation(summary = "Matricular un estudiante (Creación manual)")
    public ResponseEntity<Enrollment> createEnrollment(
            @RequestParam Long studentId,
            @RequestParam Long periodId,
            @RequestParam String gradeLevel,
            @RequestParam(defaultValue = "false") boolean isRepeating,
            @RequestParam(required = false) String previousGrade) {
        try {
            return ResponseEntity.ok(enrollmentService.createEnrollment(studentId, periodId, gradeLevel, isRepeating, previousGrade));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/promote")
    @Operation(summary = "Transición Automática: Promover estudiantes al siguiente periodo")
    public ResponseEntity<String> promoteStudents(
            @RequestParam Long currentPeriodId,
            @RequestParam Long nextPeriodId) {
        try {
            enrollmentService.promoteStudentsToNextPeriod(currentPeriodId, nextPeriodId);
            return ResponseEntity.ok("Estudiantes pre-matriculados con éxito al periodo destino.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
