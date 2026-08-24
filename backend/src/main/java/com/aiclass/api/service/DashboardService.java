package com.aiclass.api.service;

import com.aiclass.api.dto.DashboardStatsDTO;
import com.aiclass.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    
    // Aquí se inyectarían otros repositorios reales (InvoiceRepository, GradebookRepository, ObserverRepository)
    // Para simplificar, usaremos simulaciones donde no tengamos el repositorio creado aún.

    @Autowired
    public DashboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public DashboardStatsDTO getRectorDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        // Datos reales de usuarios
        stats.setTotalStudents(userRepository.findByRole("ESTUDIANTE").size());
        stats.setTotalTeachers(userRepository.findByRole("DOCENTE").size());
        stats.setTotalStaff(userRepository.findByRole("ADMINISTRATIVO").size());
        
        // Simulaciones (En producción vendrían de InvoiceRepository, etc.)
        stats.setTotalRevenue(12500000.0);
        stats.setPendingPayments(3200000.0);
        stats.setAvgSaberScore(345.5);
        stats.setActiveIncidents(12);
        
        return stats;
    }
}
