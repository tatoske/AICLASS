package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(length = 3000, nullable = false)
    private String content;

    private String category = "INSTITUCIONAL"; // INSTITUCIONAL, ACADÉMICO, CONVIVENCIA, CIRCULAR
    private String authorName;
    private String priority = "NORMAL"; // LOW, NORMAL, HIGH, URGENT
    private LocalDate publishedDate = LocalDate.now();

    public Announcement() {}

    public Announcement(String title, String content, String category, String authorName, String priority, LocalDate publishedDate) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.authorName = authorName;
        this.priority = priority;
        this.publishedDate = publishedDate;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public LocalDate getPublishedDate() { return publishedDate; }
    public void setPublishedDate(LocalDate publishedDate) { this.publishedDate = publishedDate; }
}
