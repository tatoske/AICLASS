package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "admissions")
public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String applicantName;

    @Column(nullable = false)
    private String guardianName;

    @Column(nullable = false)
    private String guardianPhone;

    @Column(nullable = false)
    private String guardianEmail;

    @Column(nullable = false)
    private String targetGrade;

    @Column(nullable = false)
    private String status = "SUBMITTED"; // SUBMITTED, IN_REVIEW, ACCEPTED, REJECTED, ENROLLED

    private LocalDate submissionDate = LocalDate.now();
    private String notes;

    public Admission() {}

    public Admission(String applicantName, String guardianName, String guardianPhone, String guardianEmail, String targetGrade, String status, LocalDate submissionDate, String notes) {
        this.applicantName = applicantName;
        this.guardianName = guardianName;
        this.guardianPhone = guardianPhone;
        this.guardianEmail = guardianEmail;
        this.targetGrade = targetGrade;
        this.status = status;
        this.submissionDate = submissionDate;
        this.notes = notes;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }

    public String getGuardianName() { return guardianName; }
    public void setGuardianName(String guardianName) { this.guardianName = guardianName; }

    public String getGuardianPhone() { return guardianPhone; }
    public void setGuardianPhone(String guardianPhone) { this.guardianPhone = guardianPhone; }

    public String getGuardianEmail() { return guardianEmail; }
    public void setGuardianEmail(String guardianEmail) { this.guardianEmail = guardianEmail; }

    public String getTargetGrade() { return targetGrade; }
    public void setTargetGrade(String targetGrade) { this.targetGrade = targetGrade; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDate submissionDate) { this.submissionDate = submissionDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
