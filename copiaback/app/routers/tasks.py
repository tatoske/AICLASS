from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models import Task

router = APIRouter()

tasks_db: List[Task] = [
    Task(courseName="Matemáticas y Cálculo", title="Taller de Derivadas e Integrales", description="Ejercicios de la página 45 a 52 del libro guía.", dueDate=date.today() + timedelta(days=5), weightPercentage=20.0, category="HACER", status="PENDING"),
    Task(courseName="Física Cuántica y Mecánica", title="Informe Laboratorio Péndulo Simple", description="Entrega de informe con gráficas de error y análisis.", dueDate=date.today() + timedelta(days=8), weightPercentage=25.0, category="HACER", status="PENDING"),
]

@router.get("", response_model=List[Task])
def get_tasks(courseId: Optional[UUID] = None):
    if courseId:
        return [t for t in tasks_db if t.courseId == courseId]
    return tasks_db

@router.get("/{id}", response_model=Task)
def get_task(id: UUID):
    for t in tasks_db:
        if t.id == id:
            return t
    raise HTTPException(status_code=404, detail="Tarea no encontrada")

@router.post("", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task: Task):
    tasks_db.append(task)
    return task

@router.put("/{id}", response_model=Task)
def update_task(id: UUID, updated: Task):
    for i, t in enumerate(tasks_db):
        if t.id == id:
            updated.id = id
            tasks_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Tarea no encontrada")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(id: UUID):
    global tasks_db
    tasks_db = [t for t in tasks_db if t.id != id]
    return
