package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "infirmary_visits")
public class InfirmaryVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String studentName;

    private String gradeLevel;
    private LocalDateTime visitDate = LocalDateTime.now();

    @Column(length = 1000, nullable = false)
    private String symptoms;

    private String medicationAdministered;
    private String disposition = "RETURNED_TO_CLASS"; // RETURNED_TO_CLASS, SENT_HOME, REFERRED_TO_HOSPITAL
    private String nurseName;
    private Boolean guardianNotified = false;

    public InfirmaryVisit() {}

    public InfirmaryVisit(String studentName, String gradeLevel, String symptoms, String medicationAdministered, String disposition, String nurseName, Boolean guardianNotified) {
        this.studentName = studentName;
        this.gradeLevel = gradeLevel;
        this.symptoms = symptoms;
        this.medicationAdministered = medicationAdministered;
        this.disposition = disposition;
        this.nurseName = nurseName;
        this.guardianNotified = guardianNotified;
        this.visitDate = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getGradeLevel() { return gradeLevel; }
    public void setGradeLevel(String gradeLevel) { this.gradeLevel = gradeLevel; }

    public LocalDateTime getVisitDate() { return visitDate; }
    public void setVisitDate(LocalDateTime visitDate) { this.visitDate = visitDate; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getMedicationAdministered() { return medicationAdministered; }
    public void setMedicationAdministered(String medicationAdministered) { this.medicationAdministered = medicationAdministered; }

    public String getDisposition() { return disposition; }
    public void setDisposition(String disposition) { this.disposition = disposition; }

    public String getNurseName() { return nurseName; }
    public void setNurseName(String nurseName) { this.nurseName = nurseName; }

    public Boolean getGuardianNotified() { return guardianNotified; }
    public void setGuardianNotified(Boolean guardianNotified) { this.guardianNotified = guardianNotified; }
}
