import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    courses,
    gradebook,
    tasks,
    attendance,
    observer,
    strengths,
    psico,
    admissions,
    finance,
    canteen,
    infirmary,
    chat,
    announcements
)

app = FastAPI(
    title="AIClass REST API (Python FastAPI)",
    description="Backend alternativo para la plataforma de gestión escolar y analítica predictiva AIClass.",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar Routers
app.include_router(courses.router, prefix="/api/courses", tags=["1. Gestión Académica - Cursos"])
app.include_router(gradebook.router, prefix="/api/gradebook", tags=["1. Gestión Académica - Planilla de Notas"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["1. Gestión Académica - Tareas"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["2. Gestión de Estudiantes - Asistencia"])
app.include_router(observer.router, prefix="/api/observer", tags=["2. Gestión de Estudiantes - Observador"])
app.include_router(strengths.router, prefix="/api/strengths", tags=["3. IA y Bienestar - Radar de Fortalezas"])
app.include_router(psico.router, prefix="/api/psico", tags=["3. IA y Bienestar - Psicoorientación"])
app.include_router(admissions.router, prefix="/api/admissions", tags=["4. Administración - Admisiones"])
app.include_router(finance.router, prefix="/api/finance", tags=["4. Administración - Finanzas"])
app.include_router(canteen.router, prefix="/api/canteen", tags=["4. Administración - Cafetería"])
app.include_router(infirmary.router, prefix="/api/infirmary", tags=["4. Administración - Enfermería"])
app.include_router(chat.router, prefix="/api/chat", tags=["5. Comunicaciones - Chat Institucional"])
app.include_router(announcements.router, prefix="/api/announcements", tags=["5. Comunicaciones - Cartelera Oficial"])

@app.get("/")
def read_root():
    return {"message": "AIClass FastAPI Backend activo", "docs_url": "/docs"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
