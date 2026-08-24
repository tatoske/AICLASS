package com.aiclass.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schools")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String nit; // Número de Identificación Tributaria
    private String address;
    private String city;
    private String domain; // Ej: colegioaiclass.edu.co

    public School() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNit() { return nit; }
    public void setNit(String nit) { this.nit = nit; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }
}
