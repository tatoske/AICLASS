package com.aiclass.api.controller;

import com.aiclass.api.model.Admission;
import com.aiclass.api.repository.AdmissionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admissions")
@Tag(name = "4. Administración - Admisiones y Matrículas", description = "Endpoints para la gestión del embudo de postulaciones y matrículas")
public class AdmissionController {

    private final AdmissionRepository admissionRepo;

    public AdmissionController(AdmissionRepository admissionRepo) {
        this.admissionRepo = admissionRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las postulaciones de admisión")
    public List<Admission> getAllAdmissions() {
        return admissionRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una postulación por ID")
    public ResponseEntity<Admission> getAdmissionById(@PathVariable UUID id) {
        return admissionRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Registrar nueva solicitud de admisión")
    public ResponseEntity<Admission> createAdmission(@RequestBody Admission admission) {
        Admission saved = admissionRepo.save(admission);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estado o datos de admisión")
    public ResponseEntity<Admission> updateAdmission(@PathVariable UUID id, @RequestBody Admission details) {
        return admissionRepo.findById(id).map(adm -> {
            adm.setApplicantName(details.getApplicantName());
            adm.setGuardianName(details.getGuardianName());
            adm.setGuardianPhone(details.getGuardianPhone());
            adm.setGuardianEmail(details.getGuardianEmail());
            adm.setTargetGrade(details.getTargetGrade());
            adm.setStatus(details.getStatus());
            adm.setNotes(details.getNotes());
            return ResponseEntity.ok(admissionRepo.save(adm));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar postulación")
    public ResponseEntity<Void> deleteAdmission(@PathVariable UUID id) {
        if (admissionRepo.existsById(id)) {
            admissionRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
