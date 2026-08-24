package com.aiclass.api.repository;

import com.aiclass.api.model.GradeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface GradeRecordRepository extends JpaRepository<GradeRecord, UUID> {
    List<GradeRecord> findByCourseId(UUID courseId);
    List<GradeRecord> findByStudentId(UUID studentId);
}
