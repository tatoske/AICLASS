from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID, uuid4
from datetime import date, datetime

# --- 1. Gestión Académica ---
class Course(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    code: str
    gradeLevel: str
    groupName: str
    teacherName: Optional[str] = None
    schedule: Optional[str] = None
    classroom: Optional[str] = None
    studentCount: Optional[int] = 0

class GradeRecord(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentId: Optional[UUID] = None
    studentName: str
    courseId: Optional[UUID] = None
    courseName: str
    term: str = "Periodo 1"
    saberScore: float = 0.0
    hacerScore: float = 0.0
    serScore: float = 0.0
    finalScore: Optional[float] = 0.0
    performanceLevel: Optional[str] = "BÁSICO"
    feedback: Optional[str] = None

    def calculate_final(self):
        self.finalScore = round((self.saberScore * 0.40) + (self.hacerScore * 0.40) + (self.serScore * 0.20), 2)
        if self.finalScore >= 4.6:
            self.performanceLevel = "SUPERIOR"
        elif self.finalScore >= 4.0:
            self.performanceLevel = "ALTO"
        elif self.finalScore >= 3.0:
            self.performanceLevel = "BÁSICO"
        else:
            self.performanceLevel = "BAJO"

class Task(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    courseId: Optional[UUID] = None
    courseName: str
    title: str
    description: Optional[str] = None
    dueDate: date
    weightPercentage: float = 20.0
    category: str = "HACER"
    status: str = "PENDING"

# --- 2. Gestión de Estudiantes y Conducta ---
class AttendanceRecord(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentId: Optional[UUID] = None
    studentName: str
    courseId: Optional[UUID] = None
    attendanceDate: date = Field(default_factory=date.today)
    status: str = "PRESENT" # PRESENT, ABSENT, LATE, EXCUSED
    notes: Optional[str] = None

class ObserverRecord(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentId: Optional[UUID] = None
    studentName: str
    authorName: str
    incidentDate: date = Field(default_factory=date.today)
    incidentType: str = "TYPE_I" # TYPE_I, TYPE_II, TYPE_III, MERIT
    description: str
    commitments: Optional[str] = None
    guardianNotified: bool = False

# --- 3. IA y Bienestar ---
class StrengthEvaluation(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentId: Optional[UUID] = None
    studentName: str
    logicalScore: int = 80
    creativeScore: int = 80
    emotionalScore: int = 80
    linguisticScore: int = 80
    spatialScore: int = 80
    aiRecommendation: Optional[str] = None
    evaluatedAt: date = Field(default_factory=date.today)

class PsicoSession(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentId: Optional[UUID] = None
    studentName: str
    counselorName: str
    sessionDate: date = Field(default_factory=date.today)
    topic: str
    observations: str
    agreements: Optional[str] = None
    confidentialityLevel: str = "RESTRICTED"

# --- 4. Administración y Servicios ---
class Admission(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    applicantName: str
    guardianName: str
    guardianPhone: str
    guardianEmail: str
    targetGrade: str
    status: str = "SUBMITTED"
    submissionDate: date = Field(default_factory=date.today)
    notes: Optional[str] = None

class Invoice(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    invoiceNumber: str
    studentId: Optional[UUID] = None
    studentName: str
    guardianName: str
    concept: str
    amount: float
    dueDate: date
    status: str = "PENDING"
    paymentMethod: Optional[str] = None

class CanteenOrder(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentName: str
    itemName: str
    quantity: int = 1
    unitPrice: float
    totalPrice: Optional[float] = 0.0
    status: str = "PREPARING"
    createdAt: datetime = Field(default_factory=datetime.now)

class InfirmaryVisit(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    studentName: str
    gradeLevel: Optional[str] = None
    visitDate: datetime = Field(default_factory=datetime.now)
    symptoms: str
    medicationAdministered: Optional[str] = None
    disposition: str = "RETURNED_TO_CLASS"
    nurseName: str
    guardianNotified: bool = False

# --- 5. Comunicaciones ---
class ChatMessage(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    channelName: str = "general"
    senderName: str
    senderRole: str
    message: str
    createdAt: datetime = Field(default_factory=datetime.now)

class Announcement(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    content: str
    category: str = "INSTITUCIONAL"
    authorName: str
    priority: str = "NORMAL"
    publishedDate: date = Field(default_factory=date.today)
