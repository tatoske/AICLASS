package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "academic_period_id")
    private AcademicPeriod academicPeriod;

    private String gradeLevel; // Ej: "10°", "11°"
    private String status; // PRE-MATRICULADO, MATRICULADO, RETIRADO, GRADUADO
    
    // Transición / Ciclo
    private boolean isRepeating; // ¿Es alumno reprobado?
    private LocalDate enrollmentDate;
    private String previousGradeLevel;

    public Enrollment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public AcademicPeriod getAcademicPeriod() { return academicPeriod; }
    public void setAcademicPeriod(AcademicPeriod academicPeriod) { this.academicPeriod = academicPeriod; }
    public String getGradeLevel() { return gradeLevel; }
    public void setGradeLevel(String gradeLevel) { this.gradeLevel = gradeLevel; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public boolean isRepeating() { return isRepeating; }
    public void setRepeating(boolean repeating) { isRepeating = repeating; }
    public LocalDate getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDate enrollmentDate) { this.enrollmentDate = enrollmentDate; }
    public String getPreviousGradeLevel() { return previousGradeLevel; }
    public void setPreviousGradeLevel(String previousGradeLevel) { this.previousGradeLevel = previousGradeLevel; }
}
