package com.aiclass.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    // Expansión de roles a: RECTOR, PROFESOR, SECRETARIA, PAGADOR, ACUDIENTE, ALUMNO
    private String role; 

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;

    private String documentType;
    private String documentNumber;
    
    private String email;
    private String phone;
    private LocalDate birthDate;
    private String gender;

    // Ubicación y Contacto
    private String country;
    private String department;
    private String municipality;
    private String commune;
    private String neighborhood;
    private String address;

    // Información de Bienestar y Estado
    private String eps;
    private String maritalStatus;
    private String capabilitiesDisabilities;
    private String conflictStatus;

    // Campos dinámicos por rol
    private String professionalTitle; // Docentes/Administrativos
    private String position; // Cargo (Docentes/Administrativos)
    private String transportSubsidy; // Estudiantes
    private String restaurantSubsidy; // Estudiantes

    public User() {}

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public School getSchool() { return school; }
    public void setSchool(School school) { this.school = school; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getDocumentNumber() { return documentNumber; }
    public void setDocumentNumber(String documentNumber) { this.documentNumber = documentNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getMunicipality() { return municipality; }
    public void setMunicipality(String municipality) { this.municipality = municipality; }

    public String getCommune() { return commune; }
    public void setCommune(String commune) { this.commune = commune; }

    public String getNeighborhood() { return neighborhood; }
    public void setNeighborhood(String neighborhood) { this.neighborhood = neighborhood; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEps() { return eps; }
    public void setEps(String eps) { this.eps = eps; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getCapabilitiesDisabilities() { return capabilitiesDisabilities; }
    public void setCapabilitiesDisabilities(String capabilitiesDisabilities) { this.capabilitiesDisabilities = capabilitiesDisabilities; }

    public String getConflictStatus() { return conflictStatus; }
    public void setConflictStatus(String conflictStatus) { this.conflictStatus = conflictStatus; }

    public String getProfessionalTitle() { return professionalTitle; }
    public void setProfessionalTitle(String professionalTitle) { this.professionalTitle = professionalTitle; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getTransportSubsidy() { return transportSubsidy; }
    public void setTransportSubsidy(String transportSubsidy) { this.transportSubsidy = transportSubsidy; }

    public String getRestaurantSubsidy() { return restaurantSubsidy; }
    public void setRestaurantSubsidy(String restaurantSubsidy) { this.restaurantSubsidy = restaurantSubsidy; }
}
