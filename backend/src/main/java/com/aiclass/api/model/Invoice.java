package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    private UUID studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String guardianName;

    @Column(nullable = false)
    private String concept;

    @Column(nullable = false)
    private Double amount;

    private LocalDate dueDate;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, PAID, OVERDUE, CANCELLED

    private String paymentMethod;

    public Invoice() {}

    public Invoice(String invoiceNumber, UUID studentId, String studentName, String guardianName, String concept, Double amount, LocalDate dueDate, String status, String paymentMethod) {
        this.invoiceNumber = invoiceNumber;
        this.studentId = studentId;
        this.studentName = studentName;
        this.guardianName = guardianName;
        this.concept = concept;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.paymentMethod = paymentMethod;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getGuardianName() { return guardianName; }
    public void setGuardianName(String guardianName) { this.guardianName = guardianName; }

    public String getConcept() { return concept; }
    public void setConcept(String concept) { this.concept = concept; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
