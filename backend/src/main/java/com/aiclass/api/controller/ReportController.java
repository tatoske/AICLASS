package com.aiclass.api.controller;

import com.aiclass.api.service.ReportGeneratorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
@Tag(name = "Reports (Reportes y Documentos)", description = "Generación de sábanas de datos, boletines, carnets y paz y salvos")
public class ReportController {

    private final ReportGeneratorService reportService;

    @Autowired
    public ReportController(ReportGeneratorService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/users/csv")
    @Operation(summary = "Exportar sábana de usuarios en CSV")
    public ResponseEntity<String> exportUsersCsv() {
        String csv = reportService.generateUsersCsvReport();
        
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=usuarios_aiclass.csv");
        headers.add(HttpHeaders.CONTENT_TYPE, "text/csv; charset=UTF-8");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csv);
    }
    
    @GetMapping("/paz-y-salvo/{studentId}")
    @Operation(summary = "Generar certificado de Paz y Salvo (PDF simulado en TXT)")
    public ResponseEntity<byte[]> generatePazYSalvo(@PathVariable Long studentId) {
        try {
            byte[] pdfBytes = reportService.generatePazYSalvo(studentId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN); // Simulado como texto
            headers.setContentDispositionFormData("attachment", "paz_y_salvo_" + studentId + ".txt");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/carnet/{studentId}")
    @Operation(summary = "Generar carnet institucional")
    public ResponseEntity<byte[]> generateCarnet(@PathVariable Long studentId) {
        try {
            byte[] carnetBytes = reportService.generateStudentCarnet(studentId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN); // Simulado como texto
            headers.setContentDispositionFormData("attachment", "carnet_" + studentId + ".txt");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(carnetBytes);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
