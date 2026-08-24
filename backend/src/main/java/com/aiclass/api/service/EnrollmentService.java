package com.aiclass.api.service;

import com.aiclass.api.model.AcademicPeriod;
import com.aiclass.api.model.Enrollment;
import com.aiclass.api.model.User;
import com.aiclass.api.repository.AcademicPeriodRepository;
import com.aiclass.api.repository.EnrollmentRepository;
import com.aiclass.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final AcademicPeriodRepository periodRepository;
    private final UserRepository userRepository;

    @Autowired
    public EnrollmentService(EnrollmentRepository enrollmentRepository, 
                             AcademicPeriodRepository periodRepository,
                             UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.periodRepository = periodRepository;
        this.userRepository = userRepository;
    }

    public List<AcademicPeriod> getAllPeriods() {
        return periodRepository.findAll();
    }

    public AcademicPeriod createPeriod(AcademicPeriod period) {
        return periodRepository.save(period);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByPeriod(Long periodId) {
        return enrollmentRepository.findByAcademicPeriodId(periodId);
    }

    @Transactional
    public Enrollment createEnrollment(Long studentId, Long periodId, String gradeLevel, boolean isRepeating, String previousGrade) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
                
        AcademicPeriod period = periodRepository.findById(periodId)
                .orElseThrow(() -> new RuntimeException("Periodo académico no encontrado"));
                
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setAcademicPeriod(period);
        enrollment.setGradeLevel(gradeLevel);
        enrollment.setStatus("MATRICULADO");
        enrollment.setRepeating(isRepeating);
        enrollment.setPreviousGradeLevel(previousGrade);
        enrollment.setEnrollmentDate(LocalDate.now());
        
        return enrollmentRepository.save(enrollment);
    }
    
    @Transactional
    public void promoteStudentsToNextPeriod(Long currentPeriodId, Long nextPeriodId) {
        // Lógica simplificada de transición
        List<Enrollment> currentEnrollments = enrollmentRepository.findByAcademicPeriodId(currentPeriodId);
        AcademicPeriod nextPeriod = periodRepository.findById(nextPeriodId)
                .orElseThrow(() -> new RuntimeException("Periodo destino no encontrado"));
                
        for (Enrollment current : currentEnrollments) {
            if ("MATRICULADO".equals(current.getStatus())) {
                Enrollment next = new Enrollment();
                next.setStudent(current.getStudent());
                next.setAcademicPeriod(nextPeriod);
                next.setEnrollmentDate(LocalDate.now());
                
                if (current.isRepeating()) {
                    // Se queda en el mismo grado
                    next.setGradeLevel(current.getGradeLevel());
                    next.setRepeating(true);
                    next.setStatus("PRE-MATRICULADO"); // Pendiente de firma
                } else {
                    // Pasa al siguiente grado (simplificado)
                    String nextGrade = calculateNextGrade(current.getGradeLevel());
                    next.setGradeLevel(nextGrade);
                    next.setRepeating(false);
                    next.setStatus("PRE-MATRICULADO"); // Promovido automáticamente
                }
                next.setPreviousGradeLevel(current.getGradeLevel());
                enrollmentRepository.save(next);
            }
        }
    }
    
    private String calculateNextGrade(String currentGrade) {
        // Simplificación: 6° -> 7°, 7° -> 8°, etc.
        try {
            String numPart = currentGrade.replace("°", "").trim();
            int num = Integer.parseInt(numPart);
            if(num >= 11) return "GRADUADO"; // Máximo grado escolar
            return (num + 1) + "°";
        } catch (Exception e) {
            return currentGrade; // Fallback
        }
    }
}
