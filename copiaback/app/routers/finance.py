from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models import Invoice

router = APIRouter()

invoices_db: List[Invoice] = [
    Invoice(invoiceNumber="FAC-2026-0089", studentName="Valentina Ríos Morales", guardianName="Gloria Morales", concept="Pensión Mensual - Agosto 2026", amount=450000.0, dueDate=date.today() + timedelta(days=10), status="PENDING", paymentMethod="PSE / Wompi"),
    Invoice(invoiceNumber="FAC-2026-0090", studentName="Mateo Gómez Aristizábal", guardianName="Fernando Gómez", concept="Pensión Mensual - Agosto 2026", amount=450000.0, dueDate=date.today() - timedelta(days=2), status="PAID", paymentMethod="Tarjeta de Crédito"),
]

@router.get("", response_model=List[Invoice])
def get_invoices(studentId: Optional[UUID] = None):
    if studentId:
        return [i for i in invoices_db if i.studentId == studentId]
    return invoices_db

@router.get("/{id}", response_model=Invoice)
def get_invoice(id: UUID):
    for i in invoices_db:
        if i.id == id:
            return i
    raise HTTPException(status_code=404, detail="Factura no encontrada")

@router.post("", response_model=Invoice, status_code=status.HTTP_201_CREATED)
def create_invoice(invoice: Invoice):
    invoices_db.append(invoice)
    return invoice

@router.put("/{id}", response_model=Invoice)
def update_invoice(id: UUID, updated: Invoice):
    for i, inv in enumerate(invoices_db):
        if inv.id == id:
            updated.id = id
            invoices_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Factura no encontrada")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_invoice(id: UUID):
    global invoices_db
    invoices_db = [i for i in invoices_db if i.id != id]
    return
