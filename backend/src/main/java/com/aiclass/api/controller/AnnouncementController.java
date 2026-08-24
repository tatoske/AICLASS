package com.aiclass.api.controller;

import com.aiclass.api.model.Announcement;
import com.aiclass.api.repository.AnnouncementRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/announcements")
@Tag(name = "5. Comunicaciones - Cartelera Oficial", description = "Endpoints para la publicación y lectura de circulares y comunicados")
public class AnnouncementController {

    private final AnnouncementRepository announcementRepo;

    public AnnouncementController(AnnouncementRepository announcementRepo) {
        this.announcementRepo = announcementRepo;
    }

    @GetMapping
    @Operation(summary = "Listar comunicados y circulares en orden cronológico")
    public List<Announcement> getAllAnnouncements() {
        return announcementRepo.findAllByOrderByPublishedDateDesc();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener comunicado por ID")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable UUID id) {
        return announcementRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Publicar nuevo comunicado institucional")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        Announcement saved = announcementRepo.save(announcement);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar comunicado")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable UUID id, @RequestBody Announcement details) {
        return announcementRepo.findById(id).map(ann -> {
            ann.setTitle(details.getTitle());
            ann.setContent(details.getContent());
            ann.setCategory(details.getCategory());
            ann.setAuthorName(details.getAuthorName());
            ann.setPriority(details.getPriority());
            ann.setPublishedDate(details.getPublishedDate());
            return ResponseEntity.ok(announcementRepo.save(ann));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar comunicado")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable UUID id) {
        if (announcementRepo.existsById(id)) {
            announcementRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
