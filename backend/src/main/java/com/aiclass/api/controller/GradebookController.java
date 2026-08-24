package com.aiclass.api.controller;

import com.aiclass.api.model.GradeRecord;
import com.aiclass.api.repository.GradeRecordRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/gradebook")
@Tag(name = "1. Gestión Académica - Planilla de Notas", description = "Endpoints para registro y cálculo de calificaciones (Saber, Hacer, Ser)")
public class GradebookController {

    private final GradeRecordRepository gradeRepo;

    public GradebookController(GradeRecordRepository gradeRepo) {
        this.gradeRepo = gradeRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las calificaciones o filtrar por curso")
    public List<GradeRecord> getGrades(@RequestParam(required = false) UUID courseId) {
        if (courseId != null) {
            return gradeRepo.findByCourseId(courseId);
        }
        return gradeRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una calificación por ID")
    public ResponseEntity<GradeRecord> getGradeById(@PathVariable UUID id) {
        return gradeRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Registrar nueva calificación")
    public ResponseEntity<GradeRecord> createGrade(@RequestBody GradeRecord grade) {
        grade.recalculateFinal();
        GradeRecord saved = gradeRepo.save(grade);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar nota de un estudiante")
    public ResponseEntity<GradeRecord> updateGrade(@PathVariable UUID id, @RequestBody GradeRecord gradeDetails) {
        return gradeRepo.findById(id).map(grade -> {
            grade.setStudentName(gradeDetails.getStudentName());
            grade.setCourseName(gradeDetails.getCourseName());
            grade.setTerm(gradeDetails.getTerm());
            grade.setSaberScore(gradeDetails.getSaberScore());
            grade.setHacerScore(gradeDetails.getHacerScore());
            grade.setSerScore(gradeDetails.getSerScore());
            grade.setFeedback(gradeDetails.getFeedback());
            grade.recalculateFinal();
            return ResponseEntity.ok(gradeRepo.save(grade));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar registro de nota")
    public ResponseEntity<Void> deleteGrade(@PathVariable UUID id) {
        if (gradeRepo.existsById(id)) {
            gradeRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
