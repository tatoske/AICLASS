package com.aiclass.api.dto;

public class DashboardStatsDTO {
    
    // Métricas Demográficas
    private long totalStudents;
    private long totalTeachers;
    private long totalStaff;
    
    // Métricas Financieras
    private double totalRevenue;
    private double pendingPayments;
    
    // Métricas Académicas (Pruebas Saber)
    private double avgSaberScore;
    
    // Métricas Disciplinarias
    private long activeIncidents;

    public DashboardStatsDTO() {}

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalTeachers() { return totalTeachers; }
    public void setTotalTeachers(long totalTeachers) { this.totalTeachers = totalTeachers; }

    public long getTotalStaff() { return totalStaff; }
    public void setTotalStaff(long totalStaff) { this.totalStaff = totalStaff; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public double getPendingPayments() { return pendingPayments; }
    public void setPendingPayments(double pendingPayments) { this.pendingPayments = pendingPayments; }

    public double getAvgSaberScore() { return avgSaberScore; }
    public void setAvgSaberScore(double avgSaberScore) { this.avgSaberScore = avgSaberScore; }

    public long getActiveIncidents() { return activeIncidents; }
    public void setActiveIncidents(long activeIncidents) { this.activeIncidents = activeIncidents; }
}
