package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "psico_sessions")
public class PsicoSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String counselorName;

    private LocalDate sessionDate = LocalDate.now();

    @Column(nullable = false)
    private String topic;

    @Column(length = 2000, nullable = false)
    private String observations;

    @Column(length = 1000)
    private String agreements;

    private String confidentialityLevel = "RESTRICTED"; // PUBLIC, INTERNAL, RESTRICTED

    public PsicoSession() {}

    public PsicoSession(UUID studentId, String studentName, String counselorName, LocalDate sessionDate, String topic, String observations, String agreements, String confidentialityLevel) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.counselorName = counselorName;
        this.sessionDate = sessionDate;
        this.topic = topic;
        this.observations = observations;
        this.agreements = agreements;
        this.confidentialityLevel = confidentialityLevel;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCounselorName() { return counselorName; }
    public void setCounselorName(String counselorName) { this.counselorName = counselorName; }

    public LocalDate getSessionDate() { return sessionDate; }
    public void setSessionDate(LocalDate sessionDate) { this.sessionDate = sessionDate; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getObservations() { return observations; }
    public void setObservations(String observations) { this.observations = observations; }

    public String getAgreements() { return agreements; }
    public void setAgreements(String agreements) { this.agreements = agreements; }

    public String getConfidentialityLevel() { return confidentialityLevel; }
    public void setConfidentialityLevel(String confidentialityLevel) { this.confidentialityLevel = confidentialityLevel; }
}
