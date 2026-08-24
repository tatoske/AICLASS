package com.aiclass.api.controller;

import com.aiclass.api.model.Course;
import com.aiclass.api.repository.CourseRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@Tag(name = "1. Gestión Académica - Cursos", description = "Endpoints para la gestión de cursos, asignaturas y horarios")
public class CourseController {

    private final CourseRepository courseRepo;

    public CourseController(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todos los cursos")
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de un curso")
    public ResponseEntity<Course> getCourseById(@PathVariable UUID id) {
        return courseRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo curso")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course saved = courseRepo.save(course);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar información de un curso")
    public ResponseEntity<Course> updateCourse(@PathVariable UUID id, @RequestBody Course courseDetails) {
        return courseRepo.findById(id).map(course -> {
            course.setName(courseDetails.getName());
            course.setCode(courseDetails.getCode());
            course.setGradeLevel(courseDetails.getGradeLevel());
            course.setGroupName(courseDetails.getGroupName());
            course.setTeacherName(courseDetails.getTeacherName());
            course.setSchedule(courseDetails.getSchedule());
            course.setClassroom(courseDetails.getClassroom());
            course.setStudentCount(courseDetails.getStudentCount());
            return ResponseEntity.ok(courseRepo.save(course));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un curso")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id) {
        if (courseRepo.existsById(id)) {
            courseRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
