package com.aiclass.api.controller;

import com.aiclass.api.model.ObserverRecord;
import com.aiclass.api.repository.ObserverRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/observer")
@Tag(name = "2. Gestión de Estudiantes - Observador del Estudiante", description = "Endpoints para el registro disciplinario, méritos y compromisos")
public class ObserverController {

    private final ObserverRepository observerRepo;

    public ObserverController(ObserverRepository observerRepo) {
        this.observerRepo = observerRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las anotaciones del observador")
    public List<ObserverRecord> getAllObserverRecords(@RequestParam(required = false) UUID studentId) {
        if (studentId != null) {
            return observerRepo.findByStudentId(studentId);
        }
        return observerRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una anotación por ID")
    public ResponseEntity<ObserverRecord> getRecordById(@PathVariable UUID id) {
        return observerRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nueva anotación en el observador")
    public ResponseEntity<ObserverRecord> createRecord(@RequestBody ObserverRecord record) {
        ObserverRecord saved = observerRepo.save(record);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar anotación o registrar compromiso")
    public ResponseEntity<ObserverRecord> updateRecord(@PathVariable UUID id, @RequestBody ObserverRecord details) {
        return observerRepo.findById(id).map(rec -> {
            rec.setStudentName(details.getStudentName());
            rec.setAuthorName(details.getAuthorName());
            rec.setIncidentDate(details.getIncidentDate());
            rec.setIncidentType(details.getIncidentType());
            rec.setDescription(details.getDescription());
            rec.setCommitments(details.getCommitments());
            rec.setGuardianNotified(details.getGuardianNotified());
            return ResponseEntity.ok(observerRepo.save(rec));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar anotación")
    public ResponseEntity<Void> deleteRecord(@PathVariable UUID id) {
        if (observerRepo.existsById(id)) {
            observerRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
