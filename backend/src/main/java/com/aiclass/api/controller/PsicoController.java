package com.aiclass.api.controller;

import com.aiclass.api.model.PsicoSession;
import com.aiclass.api.repository.PsicoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/psico")
@Tag(name = "3. IA y Bienestar - Psicoorientación Escolar", description = "Endpoints para el registro confidencial de atención y bienestar psicológico")
public class PsicoController {

    private final PsicoRepository psicoRepo;

    public PsicoController(PsicoRepository psicoRepo) {
        this.psicoRepo = psicoRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las sesiones de orientación psicológica")
    public List<PsicoSession> getAllSessions(@RequestParam(required = false) UUID studentId) {
        if (studentId != null) {
            return psicoRepo.findByStudentId(studentId);
        }
        return psicoRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle confidencial de sesión")
    public ResponseEntity<PsicoSession> getSessionById(@PathVariable UUID id) {
        return psicoRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nueva sesión de orientación")
    public ResponseEntity<PsicoSession> createSession(@RequestBody PsicoSession session) {
        PsicoSession saved = psicoRepo.save(session);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar acuerdos y observaciones de sesión")
    public ResponseEntity<PsicoSession> updateSession(@PathVariable UUID id, @RequestBody PsicoSession details) {
        return psicoRepo.findById(id).map(session -> {
            session.setStudentName(details.getStudentName());
            session.setCounselorName(details.getCounselorName());
            session.setSessionDate(details.getSessionDate());
            session.setTopic(details.getTopic());
            session.setObservations(details.getObservations());
            session.setAgreements(details.getAgreements());
            session.setConfidentialityLevel(details.getConfidentialityLevel());
            return ResponseEntity.ok(psicoRepo.save(session));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar registro de sesión")
    public ResponseEntity<Void> deleteSession(@PathVariable UUID id) {
        if (psicoRepo.existsById(id)) {
            psicoRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
