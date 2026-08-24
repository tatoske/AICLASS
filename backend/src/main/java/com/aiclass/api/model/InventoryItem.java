package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Ej: "Video Beam Epson", "Computador HP"
    private String serialNumber;
    private String status; // "ACTIVO", "MANTENIMIENTO", "DE_BAJA"
    
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location; // Dónde está asignado

    @ManyToOne
    @JoinColumn(name = "responsible_id")
    private User responsible; // Responsable del bien
    
    private LocalDate entryDate; // Fecha de ingreso
    private LocalDate manufactureDate; // Fecha de manufactura
    private LocalDate decommissionDate; // Fecha de baja (si aplica)
    
    public InventoryItem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
    public User getResponsible() { return responsible; }
    public void setResponsible(User responsible) { this.responsible = responsible; }
    public LocalDate getEntryDate() { return entryDate; }
    public void setEntryDate(LocalDate entryDate) { this.entryDate = entryDate; }
    public LocalDate getManufactureDate() { return manufactureDate; }
    public void setManufactureDate(LocalDate manufactureDate) { this.manufactureDate = manufactureDate; }
    public LocalDate getDecommissionDate() { return decommissionDate; }
    public void setDecommissionDate(LocalDate decommissionDate) { this.decommissionDate = decommissionDate; }
}
