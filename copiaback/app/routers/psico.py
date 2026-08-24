from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models import PsicoSession

router = APIRouter()

psico_db: List[PsicoSession] = [
    PsicoSession(studentName="Santiago Navarro Pineda", counselorName="Dra. Marcela Silva (Psicóloga)", sessionDate=date.today() - timedelta(days=1), topic="Técnicas de Gestión de Tiempo y Concentración", observations="El estudiante manifiesta sobrecarga académica en materias exactas.", agreements="Se acuerda plan de acompañamiento quincenal y técnicas Pomodoro.", confidentialityLevel="RESTRICTED")
]

@router.get("", response_model=List[PsicoSession])
def get_sessions(studentId: Optional[UUID] = None):
    if studentId:
        return [s for s in psico_db if s.studentId == studentId]
    return psico_db

@router.get("/{id}", response_model=PsicoSession)
def get_session(id: UUID):
    for s in psico_db:
        if s.id == id:
            return s
    raise HTTPException(status_code=404, detail="Sesión no encontrada")

@router.post("", response_model=PsicoSession, status_code=status.HTTP_201_CREATED)
def create_session(session: PsicoSession):
    psico_db.append(session)
    return session

@router.put("/{id}", response_model=PsicoSession)
def update_session(id: UUID, updated: PsicoSession):
    for i, s in enumerate(psico_db):
        if s.id == id:
            updated.id = id
            psico_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Sesión no encontrada")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_session(id: UUID):
    global psico_db
    psico_db = [s for s in psico_db if s.id != id]
    return
