package com.aiclass.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

@Entity
@Table(name = "grade_records")
public class GradeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID studentId;

    @Column(nullable = false)
    private String studentName;

    private UUID courseId;

    @Column(nullable = false)
    private String courseName;

    private String term = "Periodo 1";

    private Double saberScore = 0.0;
    private Double hacerScore = 0.0;
    private Double serScore = 0.0;
    private Double finalScore = 0.0;
    private String performanceLevel = "BÁSICO";
    private String feedback;

    public GradeRecord() {}

    public GradeRecord(UUID studentId, String studentName, UUID courseId, String courseName, String term, Double saberScore, Double hacerScore, Double serScore, String feedback) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseId = courseId;
        this.courseName = courseName;
        this.term = term;
        this.saberScore = saberScore;
        this.hacerScore = hacerScore;
        this.serScore = serScore;
        this.feedback = feedback;
        recalculateFinal();
    }

    @PrePersist
    @PreUpdate
    public void recalculateFinal() {
        double saber = saberScore != null ? saberScore : 0.0;
        double hacer = hacerScore != null ? hacerScore : 0.0;
        double ser = serScore != null ? serScore : 0.0;

        double calc = (saber * 0.40) + (hacer * 0.40) + (ser * 0.20);
        this.finalScore = BigDecimal.valueOf(calc).setScale(2, RoundingMode.HALF_UP).doubleValue();

        if (this.finalScore >= 4.6) {
            this.performanceLevel = "SUPERIOR";
        } else if (this.finalScore >= 4.0) {
            this.performanceLevel = "ALTO";
        } else if (this.finalScore >= 3.0) {
            this.performanceLevel = "BÁSICO";
        } else {
            this.performanceLevel = "BAJO";
        }
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public UUID getCourseId() { return courseId; }
    public void setCourseId(UUID courseId) { this.courseId = courseId; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Double getSaberScore() { return saberScore; }
    public void setSaberScore(Double saberScore) {
        this.saberScore = saberScore;
        recalculateFinal();
    }

    public Double getHacerScore() { return hacerScore; }
    public void setHacerScore(Double hacerScore) {
        this.hacerScore = hacerScore;
        recalculateFinal();
    }

    public Double getSerScore() { return serScore; }
    public void setSerScore(Double serScore) {
        this.serScore = serScore;
        recalculateFinal();
    }

    public Double getFinalScore() { return finalScore; }
    public void setFinalScore(Double finalScore) { this.finalScore = finalScore; }

    public String getPerformanceLevel() { return performanceLevel; }
    public void setPerformanceLevel(String performanceLevel) { this.performanceLevel = performanceLevel; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}
