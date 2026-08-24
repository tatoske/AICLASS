from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from app.models import GradeRecord

router = APIRouter()

grades_db: List[GradeRecord] = []

def init_grades():
    g1 = GradeRecord(studentName="Valentina Ríos Morales", courseName="Matemáticas y Cálculo", term="Periodo 1", saberScore=4.8, hacerScore=4.5, serScore=5.0, feedback="Excelente dominio analítico y resolución de problemas.")
    g1.calculate_final()
    g2 = GradeRecord(studentName="Mateo Gómez Aristizábal", courseName="Matemáticas y Cálculo", term="Periodo 1", saberScore=3.6, hacerScore=3.8, serScore=4.0, feedback="Buen compromiso en talleres grupales.")
    g2.calculate_final()
    g3 = GradeRecord(studentName="Sofía Castillo Mejía", courseName="Matemáticas y Cálculo", term="Periodo 1", saberScore=4.2, hacerScore=4.0, serScore=4.5, feedback="Gran participación en clase.")
    g3.calculate_final()
    g4 = GradeRecord(studentName="Santiago Navarro Pineda", courseName="Matemáticas y Cálculo", term="Periodo 1", saberScore=2.8, hacerScore=3.0, serScore=3.5, feedback="Requiere refuerzo en cálculo de derivadas.")
    g4.calculate_final()
    grades_db.extend([g1, g2, g3, g4])

init_grades()

@router.get("", response_model=List[GradeRecord])
def get_grades(courseId: Optional[UUID] = None):
    if courseId:
        return [g for g in grades_db if g.courseId == courseId]
    return grades_db

@router.get("/{id}", response_model=GradeRecord)
def get_grade(id: UUID):
    for g in grades_db:
        if g.id == id:
            return g
    raise HTTPException(status_code=404, detail="Calificación no encontrada")

@router.post("", response_model=GradeRecord, status_code=status.HTTP_201_CREATED)
def create_grade(grade: GradeRecord):
    grade.calculate_final()
    grades_db.append(grade)
    return grade

@router.put("/{id}", response_model=GradeRecord)
def update_grade(id: UUID, updated: GradeRecord):
    for i, g in enumerate(grades_db):
        if g.id == id:
            updated.id = id
            updated.calculate_final()
            grades_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Calificación no encontrada")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_grade(id: UUID):
    global grades_db
    grades_db = [g for g in grades_db if g.id != id]
    return
