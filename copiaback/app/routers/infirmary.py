from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from datetime import datetime
from app.models import InfirmaryVisit

router = APIRouter()

infirmary_db: List[InfirmaryVisit] = [
    InfirmaryVisit(studentName="Sofía Castillo Mejía", gradeLevel="10° A", symptoms="Cefalea leve y mareo tras clase de educación física.", medicationAdministered="Reposo 20 minutos e hidratación oral.", disposition="RETURNED_TO_CLASS", nurseName="Enf. Patricia Londoño", guardianNotified=True)
]

@router.get("", response_model=List[InfirmaryVisit])
def get_visits():
    return infirmary_db

@router.get("/{id}", response_model=InfirmaryVisit)
def get_visit(id: UUID):
    for v in infirmary_db:
        if v.id == id:
            return v
    raise HTTPException(status_code=404, detail="Registro de visita no encontrado")

@router.post("", response_model=InfirmaryVisit, status_code=status.HTTP_201_CREATED)
def create_visit(visit: InfirmaryVisit):
    infirmary_db.append(visit)
    return visit

@router.put("/{id}", response_model=InfirmaryVisit)
def update_visit(id: UUID, updated: InfirmaryVisit):
    for i, v in enumerate(infirmary_db):
        if v.id == id:
            updated.id = id
            infirmary_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Registro no encontrado")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_visit(id: UUID):
    global infirmary_db
    infirmary_db = [v for v in infirmary_db if v.id != id]
    return
