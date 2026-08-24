package com.aiclass.api.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String documentNumber;

    @Column(nullable = false)
    private String fullName;

    private String email;
    private String gradeLevel;
    private String groupName;
    private String guardianName;
    private String guardianPhone;
    private String status = "ACTIVE";

    public Student() {}

    public Student(String documentNumber, String fullName, String email, String gradeLevel, String groupName, String guardianName, String guardianPhone) {
        this.documentNumber = documentNumber;
        this.fullName = fullName;
        this.email = email;
        this.gradeLevel = gradeLevel;
        this.groupName = groupName;
        this.guardianName = guardianName;
        this.guardianPhone = guardianPhone;
        this.status = "ACTIVE";
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getDocumentNumber() { return documentNumber; }
    public void setDocumentNumber(String documentNumber) { this.documentNumber = documentNumber; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGradeLevel() { return gradeLevel; }
    public void setGradeLevel(String gradeLevel) { this.gradeLevel = gradeLevel; }

    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }

    public String getGuardianName() { return guardianName; }
    public void setGuardianName(String guardianName) { this.guardianName = guardianName; }

    public String getGuardianPhone() { return guardianPhone; }
    public void setGuardianPhone(String guardianPhone) { this.guardianPhone = guardianPhone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
