from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models import ObserverRecord

router = APIRouter()

observer_db: List[ObserverRecord] = [
    ObserverRecord(studentName="Valentina Ríos Morales", authorName="Prof. Carlos Mendoza", incidentDate=date.today() - timedelta(days=2), incidentType="MERIT", description="Mención de honor por desempeño en olimpiadas de matemáticas.", commitments="Continuar en el semillero", guardianNotified=True),
    ObserverRecord(studentName="Santiago Navarro Pineda", authorName="Prof. Mario Vargas", incidentDate=date.today() - timedelta(days=5), incidentType="TYPE_I", description="Uso inadecuado de dispositivo móvil en clase.", commitments="Dejar celular en casillero institucional", guardianNotified=True),
]

@router.get("", response_model=List[ObserverRecord])
def get_observer_records(studentId: Optional[UUID] = None):
    if studentId:
        return [r for r in observer_db if r.studentId == studentId]
    return observer_db

@router.get("/{id}", response_model=ObserverRecord)
def get_record(id: UUID):
    for r in observer_db:
        if r.id == id:
            return r
    raise HTTPException(status_code=404, detail="Anotación no encontrada")

@router.post("", response_model=ObserverRecord, status_code=status.HTTP_201_CREATED)
def create_record(record: ObserverRecord):
    observer_db.append(record)
    return record

@router.put("/{id}", response_model=ObserverRecord)
def update_record(id: UUID, updated: ObserverRecord):
    for i, r in enumerate(observer_db):
        if r.id == id:
            updated.id = id
            observer_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Anotación no encontrada")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(id: UUID):
    global observer_db
    observer_db = [r for r in observer_db if r.id != id]
    return
