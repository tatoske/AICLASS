package com.aiclass.api.controller;

import com.aiclass.api.dto.DashboardStatsDTO;
import com.aiclass.api.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboards")
@CrossOrigin(origins = "*")
@Tag(name = "Dashboards (Tableros Estadísticos)", description = "Agregación de métricas globales para la toma de decisiones directivas")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/rector")
    @Operation(summary = "Obtener estadísticas globales para el Dashboard del Rector")
    public DashboardStatsDTO getRectorStats() {
        return dashboardService.getRectorDashboardStats();
    }
}
