package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "strength_evaluations")
public class StrengthEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID studentId;

    @Column(nullable = false)
    private String studentName;

    private Integer logicalScore = 80;
    private Integer creativeScore = 80;
    private Integer emotionalScore = 80;
    private Integer linguisticScore = 80;
    private Integer spatialScore = 80;

    @Column(length = 1500)
    private String aiRecommendation;

    private LocalDate evaluatedAt = LocalDate.now();

    public StrengthEvaluation() {}

    public StrengthEvaluation(UUID studentId, String studentName, Integer logicalScore, Integer creativeScore, Integer emotionalScore, Integer linguisticScore, Integer spatialScore, String aiRecommendation) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.logicalScore = logicalScore;
        this.creativeScore = creativeScore;
        this.emotionalScore = emotionalScore;
        this.linguisticScore = linguisticScore;
        this.spatialScore = spatialScore;
        this.aiRecommendation = aiRecommendation;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public Integer getLogicalScore() { return logicalScore; }
    public void setLogicalScore(Integer logicalScore) { this.logicalScore = logicalScore; }

    public Integer getCreativeScore() { return creativeScore; }
    public void setCreativeScore(Integer creativeScore) { this.creativeScore = creativeScore; }

    public Integer getEmotionalScore() { return emotionalScore; }
    public void setEmotionalScore(Integer emotionalScore) { this.emotionalScore = emotionalScore; }

    public Integer getLinguisticScore() { return linguisticScore; }
    public void setLinguisticScore(Integer linguisticScore) { this.linguisticScore = linguisticScore; }

    public Integer getSpatialScore() { return spatialScore; }
    public void setSpatialScore(Integer spatialScore) { this.spatialScore = spatialScore; }

    public String getAiRecommendation() { return aiRecommendation; }
    public void setAiRecommendation(String aiRecommendation) { this.aiRecommendation = aiRecommendation; }

    public LocalDate getEvaluatedAt() { return evaluatedAt; }
    public void setEvaluatedAt(LocalDate evaluatedAt) { this.evaluatedAt = evaluatedAt; }
}
