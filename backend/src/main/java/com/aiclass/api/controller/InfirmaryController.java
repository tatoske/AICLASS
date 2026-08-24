package com.aiclass.api.controller;

import com.aiclass.api.model.InfirmaryVisit;
import com.aiclass.api.repository.InfirmaryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/infirmary")
@Tag(name = "4. Administración - Enfermería y Salud Escolar", description = "Endpoints para el registro de atención médica, dispensario y salud")
public class InfirmaryController {

    private final InfirmaryRepository infirmaryRepo;

    public InfirmaryController(InfirmaryRepository infirmaryRepo) {
        this.infirmaryRepo = infirmaryRepo;
    }

    @GetMapping
    @Operation(summary = "Listar visitas a la enfermería")
    public List<InfirmaryVisit> getAllVisits() {
        return infirmaryRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener visita por ID")
    public ResponseEntity<InfirmaryVisit> getVisitById(@PathVariable UUID id) {
        return infirmaryRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Registrar nueva atención médica escolar")
    public ResponseEntity<InfirmaryVisit> createVisit(@RequestBody InfirmaryVisit visit) {
        InfirmaryVisit saved = infirmaryRepo.save(visit);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar registro de atención o medicación")
    public ResponseEntity<InfirmaryVisit> updateVisit(@PathVariable UUID id, @RequestBody InfirmaryVisit details) {
        return infirmaryRepo.findById(id).map(visit -> {
            visit.setStudentName(details.getStudentName());
            visit.setGradeLevel(details.getGradeLevel());
            visit.setSymptoms(details.getSymptoms());
            visit.setMedicationAdministered(details.getMedicationAdministered());
            visit.setDisposition(details.getDisposition());
            visit.setNurseName(details.getNurseName());
            visit.setGuardianNotified(details.getGuardianNotified());
            return ResponseEntity.ok(infirmaryRepo.save(visit));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar registro de visita médica")
    public ResponseEntity<Void> deleteVisit(@PathVariable UUID id) {
        if (infirmaryRepo.existsById(id)) {
            infirmaryRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
