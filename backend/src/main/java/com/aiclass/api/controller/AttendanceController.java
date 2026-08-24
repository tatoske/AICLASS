package com.aiclass.api.controller;

import com.aiclass.api.model.AttendanceRecord;
import com.aiclass.api.repository.AttendanceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attendance")
@Tag(name = "2. Gestión de Estudiantes - Asistencia", description = "Endpoints para el llamado a lista diario, retardos e inasistencias")
public class AttendanceController {

    private final AttendanceRepository attendanceRepo;

    public AttendanceController(AttendanceRepository attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    @GetMapping
    @Operation(summary = "Listar registros de asistencia con filtros opcionales")
    public List<AttendanceRecord> getAttendance(
            @RequestParam(required = false) UUID courseId,
            @RequestParam(required = false) String date) {
        if (courseId != null && date != null) {
            LocalDate parsedDate = LocalDate.parse(date);
            return attendanceRepo.findByCourseIdAndAttendanceDate(courseId, parsedDate);
        }
        return attendanceRepo.findAll();
    }

    @PostMapping
    @Operation(summary = "Registrar toma de asistencia individual")
    public ResponseEntity<AttendanceRecord> createAttendance(@RequestBody AttendanceRecord record) {
        AttendanceRecord saved = attendanceRepo.save(record);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PostMapping("/batch")
    @Operation(summary = "Guardar lote completo de asistencia para un grupo")
    public ResponseEntity<List<AttendanceRecord>> saveBatchAttendance(@RequestBody List<AttendanceRecord> records) {
        List<AttendanceRecord> savedList = attendanceRepo.saveAll(records);
        return ResponseEntity.ok(savedList);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estado de asistencia de un estudiante")
    public ResponseEntity<AttendanceRecord> updateAttendance(@PathVariable UUID id, @RequestBody AttendanceRecord details) {
        return attendanceRepo.findById(id).map(rec -> {
            rec.setStatus(details.getStatus());
            rec.setNotes(details.getNotes());
            return ResponseEntity.ok(attendanceRepo.save(rec));
        }).orElse(ResponseEntity.notFound().build());
    }
}
