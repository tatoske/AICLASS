package com.aiclass.api.controller;

import com.aiclass.api.model.StrengthEvaluation;
import com.aiclass.api.repository.StrengthRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/strengths")
@Tag(name = "3. IA y Bienestar - Radar de Fortalezas", description = "Endpoints para evaluación multidimensional y analítica predictiva vocacional con IA")
public class StrengthController {

    private final StrengthRepository strengthRepo;

    public StrengthController(StrengthRepository strengthRepo) {
        this.strengthRepo = strengthRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las evaluaciones de fortalezas")
    public List<StrengthEvaluation> getAllEvaluations() {
        return strengthRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener evaluación por ID")
    public ResponseEntity<StrengthEvaluation> getEvaluationById(@PathVariable UUID id) {
        return strengthRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    @Operation(summary = "Obtener evaluación por ID de estudiante")
    public ResponseEntity<StrengthEvaluation> getEvaluationByStudentId(@PathVariable UUID studentId) {
        return strengthRepo.findByStudentId(studentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Registrar nueva evaluación diagnóstica")
    public ResponseEntity<StrengthEvaluation> createEvaluation(@RequestBody StrengthEvaluation evaluation) {
        StrengthEvaluation saved = strengthRepo.save(evaluation);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar puntajes y recomendaciones de IA")
    public ResponseEntity<StrengthEvaluation> updateEvaluation(@PathVariable UUID id, @RequestBody StrengthEvaluation details) {
        return strengthRepo.findById(id).map(eval -> {
            eval.setLogicalScore(details.getLogicalScore());
            eval.setCreativeScore(details.getCreativeScore());
            eval.setEmotionalScore(details.getEmotionalScore());
            eval.setLinguisticScore(details.getLinguisticScore());
            eval.setSpatialScore(details.getSpatialScore());
            eval.setAiRecommendation(details.getAiRecommendation());
            return ResponseEntity.ok(strengthRepo.save(eval));
        }).orElse(ResponseEntity.notFound().build());
    }
}
