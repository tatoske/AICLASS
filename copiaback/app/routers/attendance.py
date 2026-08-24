from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import date
from app.models import AttendanceRecord

router = APIRouter()

attendance_db: List[AttendanceRecord] = [
    AttendanceRecord(studentName="Valentina Ríos Morales", attendanceDate=date.today(), status="PRESENT", notes="Puntual"),
    AttendanceRecord(studentName="Mateo Gómez Aristizábal", attendanceDate=date.today(), status="PRESENT", notes="Puntual"),
    AttendanceRecord(studentName="Sofía Castillo Mejía", attendanceDate=date.today(), status="LATE", notes="Llegó 10 mins tarde"),
    AttendanceRecord(studentName="Santiago Navarro Pineda", attendanceDate=date.today(), status="ABSENT", notes="Inasistencia justificada"),
]

@router.get("", response_model=List[AttendanceRecord])
def get_attendance(courseId: Optional[UUID] = None, date_str: Optional[str] = None):
    return attendance_db

@router.post("", response_model=AttendanceRecord, status_code=status.HTTP_201_CREATED)
def create_attendance(record: AttendanceRecord):
    attendance_db.append(record)
    return record

@router.post("/batch", response_model=List[AttendanceRecord])
def save_batch(records: List[AttendanceRecord]):
    attendance_db.extend(records)
    return records

@router.put("/{id}", response_model=AttendanceRecord)
def update_attendance(id: UUID, updated: AttendanceRecord):
    for i, a in enumerate(attendance_db):
        if a.id == id:
            updated.id = id
            attendance_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Registro de asistencia no encontrado")
