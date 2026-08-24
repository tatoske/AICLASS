from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from uuid import UUID
from app.models import ChatMessage

router = APIRouter()

chat_db: List[ChatMessage] = [
    ChatMessage(channelName="general", senderName="Prof. Carlos Mendoza", senderRole="TEACHER", message="Estimados profesores, recuerden subir las notas del primer corte antes del viernes."),
    ChatMessage(channelName="general", senderName="Dra. Marcela Silva", senderRole="PSYCHOLOGIST", message="Iniciamos la semana de salud mental con talleres de mindfulness en todos los salones."),
]

@router.get("", response_model=List[ChatMessage])
def get_chat_messages(channel: str = "general"):
    return [m for m in chat_db if m.channelName == channel]

@router.post("", response_model=ChatMessage, status_code=status.HTTP_201_CREATED)
def send_message(message: ChatMessage):
    chat_db.append(message)
    return message
