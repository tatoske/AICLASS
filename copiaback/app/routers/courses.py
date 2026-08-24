from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from app.models import Course

router = APIRouter()

# Demo data
courses_db: List[Course] = [
    Course(name="Matemáticas y Cálculo", code="MAT-10A", gradeLevel="10°", groupName="A", teacherName="Prof. Carlos Mendoza", schedule="Lun-Mie-Vie 07:00 - 08:30", classroom="Aula 201", studentCount=28),
    Course(name="Física Cuántica y Mecánica", code="FIS-10A", gradeLevel="10°", groupName="A", teacherName="Prof. Elena Rostova", schedule="Mar-Jue 09:00 - 10:30", classroom="Lab Física", studentCount=26),
    Course(name="Lengua Castellana y Literatura", code="LEN-10A", gradeLevel="10°", groupName="A", teacherName="Prof. Mario Vargas", schedule="Lun-Jue 11:00 - 12:30", classroom="Aula 104", studentCount=30),
    Course(name="Inteligencia Artificial y Robótica", code="IA-11B", gradeLevel="11°", groupName="B", teacherName="Ing. David Chen", schedule="Vie 14:00 - 17:00", classroom="Lab Maker", studentCount=22),
]

@router.get("", response_model=List[Course])
def get_courses():
    return courses_db

@router.get("/{id}", response_model=Course)
def get_course(id: UUID):
    for c in courses_db:
        if c.id == id:
            return c
    raise HTTPException(status_code=404, detail="Curso no encontrado")

@router.post("", response_model=Course, status_code=status.HTTP_201_CREATED)
def create_course(course: Course):
    courses_db.append(course)
    return course

@router.put("/{id}", response_model=Course)
def update_course(id: UUID, updated: Course):
    for i, c in enumerate(courses_db):
        if c.id == id:
            updated.id = id
            courses_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Curso no encontrado")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(id: UUID):
    global courses_db
    courses_db = [c for c in courses_db if c.id != id]
    return
