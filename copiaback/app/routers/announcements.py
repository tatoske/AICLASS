from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models import Announcement

router = APIRouter()

announcements_db: List[Announcement] = [
    Announcement(title="Reunión General de Acudientes - Cierre Periodo 1", content="Se convoca cordialmente a todos los acudientes a la entrega de informes de mitad de año.", category="INSTITUCIONAL", authorName="Rectoría AIClass", priority="HIGH", publishedDate=date.today()),
    Announcement(title="Feria de Robótica e Innovación Tecnológica 2026", content="Abiertas las postulaciones de proyectos para la muestra de ciencia de fin de año.", category="ACADÉMICO", authorName="Coordinación de Innovación", priority="NORMAL", publishedDate=date.today() - timedelta(days=1)),
]

@router.get("", response_model=List[Announcement])
def get_announcements():
    return announcements_db

@router.get("/{id}", response_model=Announcement)
def get_announcement(id: UUID):
    for a in announcements_db:
        if a.id == id:
            return a
    raise HTTPException(status_code=404, detail="Comunicado no encontrado")

@router.post("", response_model=Announcement, status_code=status.HTTP_201_CREATED)
def create_announcement(announcement: Announcement):
    announcements_db.append(announcement)
    return announcement

@router.put("/{id}", response_model=Announcement)
def update_announcement(id: UUID, updated: Announcement):
    for i, a in enumerate(announcements_db):
        if a.id == id:
            updated.id = id
            announcements_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Comunicado no encontrado")

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_announcement(id: UUID):
    global announcements_db
    announcements_db = [a for a in announcements_db if a.id != id]
    return
