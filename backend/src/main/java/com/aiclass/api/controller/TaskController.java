package com.aiclass.api.controller;

import com.aiclass.api.model.Task;
import com.aiclass.api.repository.TaskRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "1. Gestión Académica - Tareas y Agenda", description = "Endpoints para la gestión de deberes, ponderaciones y estado de entrega")
public class TaskController {

    private final TaskRepository taskRepo;

    public TaskController(TaskRepository taskRepo) {
        this.taskRepo = taskRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las tareas escolares")
    public List<Task> getAllTasks(@RequestParam(required = false) UUID courseId) {
        if (courseId != null) {
            return taskRepo.findByCourseId(courseId);
        }
        return taskRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una tarea por ID")
    public ResponseEntity<Task> getTaskById(@PathVariable UUID id) {
        return taskRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear una nueva tarea escolar")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task saved = taskRepo.save(task);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar información de una tarea")
    public ResponseEntity<Task> updateTask(@PathVariable UUID id, @RequestBody Task taskDetails) {
        return taskRepo.findById(id).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setCourseName(taskDetails.getCourseName());
            task.setDueDate(taskDetails.getDueDate());
            task.setWeightPercentage(taskDetails.getWeightPercentage());
            task.setCategory(taskDetails.getCategory());
            task.setStatus(taskDetails.getStatus());
            return ResponseEntity.ok(taskRepo.save(task));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una tarea")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        if (taskRepo.existsById(id)) {
            taskRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
