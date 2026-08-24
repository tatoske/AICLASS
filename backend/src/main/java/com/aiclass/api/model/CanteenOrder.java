package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "canteen_orders")
public class CanteenOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String itemName;

    private Integer quantity = 1;
    private Double unitPrice;
    private Double totalPrice;
    private String status = "PREPARING"; // ORDERED, PREPARING, DELIVERED, CANCELLED
    private LocalDateTime createdAt = LocalDateTime.now();

    public CanteenOrder() {}

    public CanteenOrder(String studentName, String itemName, Integer quantity, Double unitPrice, String status) {
        this.studentName = studentName;
        this.itemName = itemName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = (unitPrice != null && quantity != null) ? unitPrice * quantity : 0.0;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        if (unitPrice != null && quantity != null) {
            this.totalPrice = unitPrice * quantity;
        }
    }

    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        if (unitPrice != null && quantity != null) {
            this.totalPrice = unitPrice * quantity;
        }
    }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
