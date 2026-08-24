from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models import Admission

router = APIRouter()

admissions_db: List[Admission] = [
    Admission(applicantName="Lucas Ramírez Cadavid", guardianName="Pedro Ramírez", guardianPhone="3123456789", guardianEmail="pedro.ramirez@gmail.com", targetGrade="10°", status="IN_REVIEW", submissionDate=date.today() - timedelta(days=3), notes="Documentos completos, pendiente entrevista psicológica."),
    Admission(applicantName="Isabella Torres Gil", guardianName="Carolina Gil", guardianPhone="3187654321", guardianEmail="carolina.gil@hotmail.com", targetGrade="11°", status="ACCEPTED", submissionDate=date.today() - timedelta(days=7), notes="Aprobada por el comité directivo."),
]

@router.get("", response_model=List[Admission])
def get_admissions():
    return admissions_db

@router.get("/{id}", response_model=Admission)
def get_admission(id: UUID):
    for a in admissions_db:
        if a.id == id:
            return a
    raise HTTPException(status_code=404, detail="Solicitud de admisión no encontrada")

@router.post("", response_model=Admission, status_code=status.HTTP_201_CREATED)
def create_admission(admission: Admission):
    admissions_db.append(admission)
    return admission

@router.put("/{id}", response_model=Admission)
def update_admission(id: UUID, updated: Admission):
    for i, a in enumerate(admissions_db):
        if a.id == id:
            updated.id = id
            admissions_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Solicitud no encontrada")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admission(id: UUID):
    global admissions_db
    admissions_db = [a for a in admissions_db if a.id != id]
    return
