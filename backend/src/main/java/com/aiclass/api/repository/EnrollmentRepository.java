package com.aiclass.api.repository;

import com.aiclass.api.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByAcademicPeriodId(Long periodId);
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByGradeLevel(String gradeLevel);
    List<Enrollment> findByStatus(String status);
}
