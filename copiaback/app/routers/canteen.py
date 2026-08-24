from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from app.models import CanteenOrder

router = APIRouter()

canteen_db: List[CanteenOrder] = [
    CanteenOrder(studentName="Valentina Ríos Morales", itemName="Almuerzo Ejecutivo Saludable + Jugo Natural", quantity=1, unitPrice=14000.0, status="DELIVERED"),
    CanteenOrder(studentName="Mateo Gómez Aristizábal", itemName="Sándwich Gourmet de Pavo + Té Verde", quantity=1, unitPrice=9500.0, status="PREPARING"),
]

@router.get("", response_model=List[CanteenOrder])
def get_orders():
    return canteen_db

@router.post("", response_model=CanteenOrder, status_code=status.HTTP_201_CREATED)
def create_order(order: CanteenOrder):
    order.totalPrice = order.unitPrice * order.quantity
    canteen_db.append(order)
    return order

@router.put("/{id}", response_model=CanteenOrder)
def update_order_status(id: UUID, updated: CanteenOrder):
    for i, o in enumerate(canteen_db):
        if o.id == id:
            updated.id = id
            canteen_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Pedido no encontrado")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(id: UUID):
    global canteen_db
    canteen_db = [o for o in canteen_db if o.id != id]
    return
