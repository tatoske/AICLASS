package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID courseId;

    @Column(nullable = false)
    private String courseName;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private LocalDate dueDate;
    private Double weightPercentage = 20.0;
    private String category = "HACER"; // SABER, HACER, SER
    private String status = "PENDING"; // PENDING, COMPLETED, LATE

    public Task() {}

    public Task(UUID courseId, String courseName, String title, String description, LocalDate dueDate, Double weightPercentage, String category, String status) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.weightPercentage = weightPercentage;
        this.category = category;
        this.status = status;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getCourseId() { return courseId; }
    public void setCourseId(UUID courseId) { this.courseId = courseId; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public Double getWeightPercentage() { return weightPercentage; }
    public void setWeightPercentage(Double weightPercentage) { this.weightPercentage = weightPercentage; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
