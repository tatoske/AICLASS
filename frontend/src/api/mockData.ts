export const initialMockData = {
  courses: [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Matemáticas y Cálculo', code: 'MAT-10A', gradeLevel: '10°', groupName: 'A', teacherName: 'Prof. Carlos Mendoza', schedule: 'Lun-Mie-Vie 07:00 - 08:30', classroom: 'Aula 201', studentCount: 28 },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Física Cuántica y Mecánica', code: 'FIS-10A', gradeLevel: '10°', groupName: 'A', teacherName: 'Prof. Elena Rostova', schedule: 'Mar-Jue 09:00 - 10:30', classroom: 'Lab Física', studentCount: 26 },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Lengua Castellana y Literatura', code: 'LEN-10A', gradeLevel: '10°', groupName: 'A', teacherName: 'Prof. Mario Vargas', schedule: 'Lun-Jue 11:00 - 12:30', classroom: 'Aula 104', studentCount: 30 },
    { id: '44444444-4444-4444-4444-444444444444', name: 'Inteligencia Artificial y Robótica', code: 'IA-11B', gradeLevel: '11°', groupName: 'B', teacherName: 'Ing. David Chen', schedule: 'Vie 14:00 - 17:00', classroom: 'Lab Maker', studentCount: 22 },
  ],
  gradebook: [
    { id: 'g1', studentName: 'Valentina Ríos Morales', courseName: 'Matemáticas y Cálculo', term: 'Periodo 1', saberScore: 4.8, hacerScore: 4.5, serScore: 5.0, finalScore: 4.72, performanceLevel: 'SUPERIOR', feedback: 'Excelente dominio analítico y resolución de problemas.' },
    { id: 'g2', studentName: 'Mateo Gómez Aristizábal', courseName: 'Matemáticas y Cálculo', term: 'Periodo 1', saberScore: 3.6, hacerScore: 3.8, serScore: 4.0, finalScore: 3.76, performanceLevel: 'ALTO', feedback: 'Buen compromiso en talleres grupales.' },
    { id: 'g3', studentName: 'Sofía Castillo Mejía', courseName: 'Matemáticas y Cálculo', term: 'Periodo 1', saberScore: 4.2, hacerScore: 4.0, serScore: 4.5, finalScore: 4.18, performanceLevel: 'ALTO', feedback: 'Gran participación en clase.' },
    { id: 'g4', studentName: 'Santiago Navarro Pineda', courseName: 'Matemáticas y Cálculo', term: 'Periodo 1', saberScore: 2.8, hacerScore: 3.0, serScore: 3.5, finalScore: 3.02, performanceLevel: 'BÁSICO', feedback: 'Requiere refuerzo en cálculo de derivadas.' },
  ],
  tasks: [
    { id: 't1', courseName: 'Matemáticas y Cálculo', title: 'Taller de Derivadas e Integrales', description: 'Ejercicios de la página 45 a 52 del libro guía.', dueDate: '2026-09-05', weightPercentage: 20.0, category: 'HACER', status: 'PENDING' },
    { id: 't2', courseName: 'Física Cuántica y Mecánica', title: 'Informe Laboratorio Péndulo Simple', description: 'Entrega de informe con gráficas de error y análisis físico.', dueDate: '2026-09-10', weightPercentage: 25.0, category: 'HACER', status: 'PENDING' },
  ],
  attendance: [
    { id: 'att1', studentName: 'Valentina Ríos Morales', attendanceDate: '2026-08-24', status: 'PRESENT', notes: 'Puntual' },
    { id: 'att2', studentName: 'Mateo Gómez Aristizábal', attendanceDate: '2026-08-24', status: 'PRESENT', notes: 'Puntual' },
    { id: 'att3', studentName: 'Sofía Castillo Mejía', attendanceDate: '2026-08-24', status: 'LATE', notes: 'Llegó 10 mins tarde con autorización' },
    { id: 'att4', studentName: 'Santiago Navarro Pineda', attendanceDate: '2026-08-24', status: 'ABSENT', notes: 'Inasistencia justificada por cita médica' },
  ],
  observer: [
    { id: 'obs1', studentName: 'Valentina Ríos Morales', authorName: 'Prof. Carlos Mendoza', incidentDate: '2026-08-22', incidentType: 'MERIT', description: 'Representó con honores al colegio en las Olimpiadas Regionales de Matemáticas.', commitments: 'Mención de honor en izada de bandera', guardianNotified: true },
    { id: 'obs2', studentName: 'Santiago Navarro Pineda', authorName: 'Prof. Mario Vargas', incidentDate: '2026-08-19', incidentType: 'TYPE_I', description: 'Uso indebido de celular durante la explicación del docente.', commitments: 'Estudiante se compromete a dejar el celular en el casillero.', guardianNotified: true },
  ],
  strengths: [
    { id: 'str1', studentName: 'Valentina Ríos Morales', logicalScore: 94, creativeScore: 82, emotionalScore: 88, linguisticScore: 90, spatialScore: 78, aiRecommendation: 'Perfil sobresaliente con alta afinidad hacia Ingeniería de Software, Ciencia de Datos y Liderazgo Científico.', evaluatedAt: '2026-08-24' },
    { id: 'str2', studentName: 'Mateo Gómez Aristizábal', logicalScore: 75, creativeScore: 96, emotionalScore: 85, linguisticScore: 78, spatialScore: 92, aiRecommendation: 'Alta predisposición y talento natural en Diseño Industrial, Creatividad Visual y Producción Audiovisual.', evaluatedAt: '2026-08-24' },
  ],
  psico: [
    { id: 'psi1', studentName: 'Santiago Navarro Pineda', counselorName: 'Dra. Marcela Silva (Psicóloga)', sessionDate: '2026-08-23', topic: 'Técnicas de Gestión de Tiempo y Concentración', observations: 'El estudiante manifiesta sobrecarga académica en materias exactas.', agreements: 'Se acuerda plan de acompañamiento quincenal y técnicas Pomodoro.', confidentialityLevel: 'RESTRICTED' }
  ],
  admissions: [
    { id: 'adm1', applicantName: 'Lucas Ramírez Cadavid', guardianName: 'Pedro Ramírez', guardianPhone: '3123456789', guardianEmail: 'pedro.ramirez@gmail.com', targetGrade: '10°', status: 'IN_REVIEW', submissionDate: '2026-08-21', notes: 'Documentos completos, pendiente entrevista psicológica.' },
    { id: 'adm2', applicantName: 'Isabella Torres Gil', guardianName: 'Carolina Gil', guardianPhone: '3187654321', guardianEmail: 'carolina.gil@hotmail.com', targetGrade: '11°', status: 'ACCEPTED', submissionDate: '2026-08-17', notes: 'Aprobada por el comité directivo.' }
  ],
  finance: [
    { id: 'inv1', invoiceNumber: 'FAC-2026-0089', studentName: 'Valentina Ríos Morales', guardianName: 'Gloria Morales', concept: 'Pensión Mensual - Agosto 2026', amount: 450000.0, dueDate: '2026-09-05', status: 'PENDING', paymentMethod: 'PSE / Wompi' },
    { id: 'inv2', invoiceNumber: 'FAC-2026-0090', studentName: 'Mateo Gómez Aristizábal', guardianName: 'Fernando Gómez', concept: 'Pensión Mensual - Agosto 2026', amount: 450000.0, dueDate: '2026-08-22', status: 'PAID', paymentMethod: 'Tarjeta de Crédito' }
  ],
  canteen: [
    { id: 'can1', studentName: 'Valentina Ríos Morales', itemName: 'Almuerzo Ejecutivo Saludable + Jugo Natural', quantity: 1, unitPrice: 14000.0, totalPrice: 14000.0, status: 'DELIVERED', createdAt: '2026-08-24T10:00:00' },
    { id: 'can2', studentName: 'Mateo Gómez Aristizábal', itemName: 'Sándwich Gourmet de Pavo + Té Verde', quantity: 1, unitPrice: 9500.0, totalPrice: 9500.0, status: 'PREPARING', createdAt: '2026-08-24T10:15:00' }
  ],
  infirmary: [
    { id: 'inf1', studentName: 'Sofía Castillo Mejía', gradeLevel: '10° A', symptoms: 'Cefalea leve y mareo tras clase de educación física.', medicationAdministered: 'Reposo 20 minutos e hidratación oral.', disposition: 'RETURNED_TO_CLASS', nurseName: 'Enf. Patricia Londoño', guardianNotified: true, visitDate: '2026-08-24T09:30:00' }
  ],
  chat: [
    { id: 'c1', channelName: 'general', senderName: 'Prof. Carlos Mendoza', senderRole: 'TEACHER', message: 'Estimados profesores, recuerden subir las notas del primer corte antes del viernes.', createdAt: '2026-08-24T08:00:00' },
    { id: 'c2', channelName: 'general', senderName: 'Dra. Marcela Silva', senderRole: 'PSYCHOLOGIST', message: 'Iniciamos la semana de salud mental con talleres de mindfulness en todos los salones.', createdAt: '2026-08-24T08:30:00' }
  ],
  announcements: [
    { id: 'a1', title: 'Reunión General de Acudientes - Cierre Periodo 1', content: 'Se convoca cordialmente a todos los acudientes a la entrega de informes de mitad de año.', category: 'INSTITUCIONAL', authorName: 'Rectoría AIClass', priority: 'HIGH', publishedDate: '2026-08-24' },
    { id: 'a2', title: 'Feria de Robótica e Innovación Tecnológica 2026', content: 'Abiertas las postulaciones de proyectos para la muestra de ciencia de fin de año.', category: 'ACADÉMICO', authorName: 'Coordinación de Innovación', priority: 'NORMAL', publishedDate: '2026-08-23' }
  ]
};
