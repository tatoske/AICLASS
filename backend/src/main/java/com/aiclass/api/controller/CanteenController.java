package com.aiclass.api.controller;

import com.aiclass.api.model.CanteenOrder;
import com.aiclass.api.repository.CanteenRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/canteen")
@Tag(name = "4. Administración - Cafetería y Restaurante Escolar", description = "Endpoints para la gestión de monedero digital y pedidos del restaurante")
public class CanteenController {

    private final CanteenRepository canteenRepo;

    public CanteenController(CanteenRepository canteenRepo) {
        this.canteenRepo = canteenRepo;
    }

    @GetMapping
    @Operation(summary = "Listar pedidos de cafetería")
    public List<CanteenOrder> getAllOrders() {
        return canteenRepo.findAll();
    }

    @PostMapping
    @Operation(summary = "Crear nuevo pedido en restaurante escolar")
    public ResponseEntity<CanteenOrder> createOrder(@RequestBody CanteenOrder order) {
        if (order.getUnitPrice() != null && order.getQuantity() != null) {
            order.setTotalPrice(order.getUnitPrice() * order.getQuantity());
        }
        CanteenOrder saved = canteenRepo.save(order);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estado de preparación del pedido")
    public ResponseEntity<CanteenOrder> updateOrderStatus(@PathVariable UUID id, @RequestBody CanteenOrder details) {
        return canteenRepo.findById(id).map(order -> {
            order.setStatus(details.getStatus());
            return ResponseEntity.ok(canteenRepo.save(order));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancelar pedido")
    public ResponseEntity<Void> deleteOrder(@PathVariable UUID id) {
        if (canteenRepo.existsById(id)) {
            canteenRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
