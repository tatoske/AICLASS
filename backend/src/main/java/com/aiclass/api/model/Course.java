package com.aiclass.api.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String gradeLevel;

    @Column(nullable = false)
    private String groupName;

    private String teacherName;
    private String schedule;
    private String classroom;
    private Integer studentCount = 0;

    public Course() {}

    public Course(String name, String code, String gradeLevel, String groupName, String teacherName, String schedule, String classroom, Integer studentCount) {
        this.name = name;
        this.code = code;
        this.gradeLevel = gradeLevel;
        this.groupName = groupName;
        this.teacherName = teacherName;
        this.schedule = schedule;
        this.classroom = classroom;
        this.studentCount = studentCount;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getGradeLevel() { return gradeLevel; }
    public void setGradeLevel(String gradeLevel) { this.gradeLevel = gradeLevel; }

    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }

    public String getTeacherName() { return teacherName; }
    public void setTeacherName(String teacherName) { this.teacherName = teacherName; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public String getClassroom() { return classroom; }
    public void setClassroom(String classroom) { this.classroom = classroom; }

    public Integer getStudentCount() { return studentCount; }
    public void setStudentCount(Integer studentCount) { this.studentCount = studentCount; }
}
