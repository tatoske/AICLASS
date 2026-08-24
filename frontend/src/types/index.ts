export interface Course {
  id: string;
  name: string;
  code: string;
  gradeLevel: string;
  groupName: string;
  teacherName?: string;
  schedule?: string;
  classroom?: string;
  studentCount?: number;
}

export interface GradeRecord {
  id: string;
  studentId?: string;
  studentName: string;
  courseId?: string;
  courseName: string;
  term: string;
  saberScore: number;
  hacerScore: number;
  serScore: number;
  finalScore?: number;
  performanceLevel?: string;
  feedback?: string;
}

export interface Task {
  id: string;
  courseId?: string;
  courseName: string;
  title: string;
  description?: string;
  dueDate: string;
  weightPercentage: number;
  category: 'SABER' | 'HACER' | 'SER';
  status: 'PENDING' | 'COMPLETED' | 'LATE';
}

export interface AttendanceRecord {
  id: string;
  studentId?: string;
  studentName: string;
  courseId?: string;
  attendanceDate: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
}

export interface ObserverRecord {
  id: string;
  studentId?: string;
  studentName: string;
  authorName: string;
  incidentDate: string;
  incidentType: 'TYPE_I' | 'TYPE_II' | 'TYPE_III' | 'MERIT';
  description: string;
  commitments?: string;
  guardianNotified: boolean;
}

export interface StrengthEvaluation {
  id: string;
  studentId?: string;
  studentName: string;
  logicalScore: number;
  creativeScore: number;
  emotionalScore: number;
  linguisticScore: number;
  spatialScore: number;
  aiRecommendation?: string;
  evaluatedAt: string;
}

export interface PsicoSession {
  id: string;
  studentId?: string;
  studentName: string;
  counselorName: string;
  sessionDate: string;
  topic: string;
  observations: string;
  agreements?: string;
  confidentialityLevel: 'PUBLIC' | 'INTERNAL' | 'RESTRICTED';
}

export interface Admission {
  id: string;
  applicantName: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  targetGrade: string;
  status: 'SUBMITTED' | 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'ENROLLED';
  submissionDate: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId?: string;
  studentName: string;
  guardianName: string;
  concept: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  paymentMethod?: string;
}

export interface CanteenOrder {
  id: string;
  studentName: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  status: 'ORDERED' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';
  createdAt?: string;
}

export interface InfirmaryVisit {
  id: string;
  studentName: string;
  gradeLevel?: string;
  visitDate: string;
  symptoms: string;
  medicationAdministered?: string;
  disposition: string;
  nurseName: string;
  guardianNotified: boolean;
}

export interface ChatMessage {
  id: string;
  channelName: string;
  senderName: string;
  senderRole: string;
  message: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  publishedDate?: string;
}

export interface School {
  id?: string;
  name: string;
  nit: string;
  address: string;
  city: string;
  domain: string;
}

export interface User {
  id?: string;
  name: string;
  role: 'RECTOR' | 'PROFESOR' | 'SECRETARIA' | 'PAGADOR' | 'ACUDIENTE' | 'ALUMNO';
  school?: School;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  country: string;
  department: string;
  municipality: string;
  commune: string;
  neighborhood: string;
  address: string;
  eps: string;
  maritalStatus: string;
  capabilitiesDisabilities: string;
  conflictStatus: string;
  professionalTitle?: string;
  position?: string;
  transportSubsidy?: string;
  restaurantSubsidy?: string;
}

export interface AcademicPeriod {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface Enrollment {
  id?: string;
  student: User;
  academicPeriod: AcademicPeriod;
  gradeLevel: string;
  status: string;
  repeating: boolean;
  enrollmentDate: string;
  previousGradeLevel?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalStaff: number;
  totalRevenue: number;
  pendingPayments: number;
  avgSaberScore: number;
  activeIncidents: number;
}

export interface Location {
  id?: string;
  name: string;
  type: string;
  campus: string;
  buildingBlock: string;
  floor: string;
  area: number;
}

export interface InventoryItem {
  id?: string;
  name: string;
  serialNumber: string;
  status: string;
  location?: Location;
  responsible?: User;
  entryDate: string;
  manufactureDate: string;
  decommissionDate?: string;
}
