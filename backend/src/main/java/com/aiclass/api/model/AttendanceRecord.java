package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "attendance_records")
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID studentId;

    @Column(nullable = false)
    private String studentName;

    private UUID courseId;

    private LocalDate attendanceDate = LocalDate.now();

    @Column(nullable = false)
    private String status = "PRESENT"; // PRESENT, ABSENT, LATE, EXCUSED

    private String notes;

    public AttendanceRecord() {}

    public AttendanceRecord(UUID studentId, String studentName, UUID courseId, LocalDate attendanceDate, String status, String notes) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseId = courseId;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.notes = notes;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public UUID getCourseId() { return courseId; }
    public void setCourseId(UUID courseId) { this.courseId = courseId; }

    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
