package com.aiclass.api.controller;

import com.aiclass.api.model.InventoryItem;
import com.aiclass.api.model.Location;
import com.aiclass.api.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
@Tag(name = "Inventory (Inventario e Infraestructura)", description = "Gestión de recursos físicos, salones y bienes de la institución")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/locations")
    @Operation(summary = "Obtener todos los salones y sedes")
    public List<Location> getAllLocations() {
        return inventoryService.getAllLocations();
    }

    @PostMapping("/locations")
    @Operation(summary = "Crear nueva sede o salón")
    public Location createLocation(@RequestBody Location location) {
        return inventoryService.createLocation(location);
    }

    @GetMapping("/items")
    @Operation(summary = "Obtener todos los bienes del inventario")
    public List<InventoryItem> getAllItems() {
        return inventoryService.getAllItems();
    }

    @PostMapping("/items")
    @Operation(summary = "Registrar nuevo bien en inventario")
    public InventoryItem createItem(@RequestBody InventoryItem item) {
        return inventoryService.createItem(item);
    }

    @PostMapping("/items/{id}/decommission")
    @Operation(summary = "Dar de baja a un bien (ej. por daño o vencimiento)")
    public ResponseEntity<Void> decommissionItem(@PathVariable Long id) {
        inventoryService.decommissionItem(id);
        return ResponseEntity.ok().build();
    }
}
