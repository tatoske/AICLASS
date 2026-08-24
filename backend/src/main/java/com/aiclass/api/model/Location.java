package com.aiclass.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Ej: "Salón 101", "Laboratorio de Química"
    private String type; // "AULA", "LABORATORIO", "OFICINA", "OTRO"
    private String campus; // Sede: "Sede Principal", "Sede Norte"
    private String buildingBlock; // Bloque: "Bloque A", "Bloque B"
    private String floor; // Piso: "Piso 1", "Piso 2"
    private Double area; // Área en m2

    public Location() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getCampus() { return campus; }
    public void setCampus(String campus) { this.campus = campus; }
    public String getBuildingBlock() { return buildingBlock; }
    public void setBuildingBlock(String buildingBlock) { this.buildingBlock = buildingBlock; }
    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }
    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }
}
