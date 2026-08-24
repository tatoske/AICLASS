package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String channelName;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false)
    private String senderRole; // TEACHER, ADMIN, GUARDIAN, STUDENT

    @Column(length = 2000, nullable = false)
    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();

    public ChatMessage() {}

    public ChatMessage(String channelName, String senderName, String senderRole, String message) {
        this.channelName = channelName;
        this.senderName = senderName;
        this.senderRole = senderRole;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getChannelName() { return channelName; }
    public void setChannelName(String channelName) { this.channelName = channelName; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getSenderRole() { return senderRole; }
    public void setSenderRole(String senderRole) { this.senderRole = senderRole; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
