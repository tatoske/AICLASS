package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "observer_records")
public class ObserverRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String authorName;

    private LocalDate incidentDate = LocalDate.now();

    @Column(nullable = false)
    private String incidentType = "TYPE_I"; // TYPE_I, TYPE_II, TYPE_III, MERIT

    @Column(length = 1500, nullable = false)
    private String description;

    @Column(length = 1000)
    private String commitments;

    private Boolean guardianNotified = false;

    public ObserverRecord() {}

    public ObserverRecord(UUID studentId, String studentName, String authorName, LocalDate incidentDate, String incidentType, String description, String commitments, Boolean guardianNotified) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.authorName = authorName;
        this.incidentDate = incidentDate;
        this.incidentType = incidentType;
        this.description = description;
        this.commitments = commitments;
        this.guardianNotified = guardianNotified;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public LocalDate getIncidentDate() { return incidentDate; }
    public void setIncidentDate(LocalDate incidentDate) { this.incidentDate = incidentDate; }

    public String getIncidentType() { return incidentType; }
    public void setIncidentType(String incidentType) { this.incidentType = incidentType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCommitments() { return commitments; }
    public void setCommitments(String commitments) { this.commitments = commitments; }

    public Boolean getGuardianNotified() { return guardianNotified; }
    public void setGuardianNotified(Boolean guardianNotified) { this.guardianNotified = guardianNotified; }
}
