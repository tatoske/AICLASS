package com.aiclass.api.controller;

import com.aiclass.api.model.Invoice;
import com.aiclass.api.repository.InvoiceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/finance")
@Tag(name = "4. Administración - Finanzas y Tesorería", description = "Endpoints para la gestión de facturas, pensiones y estados de cuenta")
public class FinanceController {

    private final InvoiceRepository invoiceRepo;

    public FinanceController(InvoiceRepository invoiceRepo) {
        this.invoiceRepo = invoiceRepo;
    }

    @GetMapping
    @Operation(summary = "Listar todas las facturas y pagos")
    public List<Invoice> getAllInvoices(@RequestParam(required = false) UUID studentId) {
        if (studentId != null) {
            return invoiceRepo.findByStudentId(studentId);
        }
        return invoiceRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener factura por ID")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable UUID id) {
        return invoiceRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nueva factura de pensión o matrícula")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice saved = invoiceRepo.save(invoice);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estado de pago o método")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable UUID id, @RequestBody Invoice details) {
        return invoiceRepo.findById(id).map(inv -> {
            inv.setStatus(details.getStatus());
            inv.setPaymentMethod(details.getPaymentMethod());
            inv.setConcept(details.getConcept());
            inv.setAmount(details.getAmount());
            inv.setDueDate(details.getDueDate());
            return ResponseEntity.ok(invoiceRepo.save(inv));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Anular o eliminar factura")
    public ResponseEntity<Void> deleteInvoice(@PathVariable UUID id) {
        if (invoiceRepo.existsById(id)) {
            invoiceRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
