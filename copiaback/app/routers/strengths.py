from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from app.models import StrengthEvaluation

router = APIRouter()

strengths_db: List[StrengthEvaluation] = [
    StrengthEvaluation(studentName="Valentina Ríos Morales", logicalScore=94, creativeScore=82, emotionalScore=88, linguisticScore=90, spatialScore=78, aiRecommendation="Perfil sobresaliente con alta afinidad hacia Ingeniería de Software, Ciencia de Datos y Liderazgo Científico."),
    StrengthEvaluation(studentName="Mateo Gómez Aristizábal", logicalScore=75, creativeScore=96, emotionalScore=85, linguisticScore=78, spatialScore=92, aiRecommendation="Alta predisposición y talento natural en Diseño Industrial, Creatividad Visual y Animación 3D."),
]

@router.get("", response_model=List[StrengthEvaluation])
def get_evaluations():
    return strengths_db

@router.get("/{id}", response_model=StrengthEvaluation)
def get_evaluation(id: UUID):
    for s in strengths_db:
        if s.id == id:
            return s
    raise HTTPException(status_code=404, detail="Evaluación no encontrada")

@router.post("", response_model=StrengthEvaluation, status_code=status.HTTP_201_CREATED)
def create_evaluation(evaluation: StrengthEvaluation):
    strengths_db.append(evaluation)
    return evaluation

@router.put("/{id}", response_model=StrengthEvaluation)
def update_evaluation(id: UUID, updated: StrengthEvaluation):
    for i, s in enumerate(strengths_db):
        if s.id == id:
            updated.id = id
            strengths_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Evaluación no encontrada")
