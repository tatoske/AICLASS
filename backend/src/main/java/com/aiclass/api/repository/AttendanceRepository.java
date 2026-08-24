package com.aiclass.api.repository;

import com.aiclass.api.model.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceRecord, UUID> {
    List<AttendanceRecord> findByCourseIdAndAttendanceDate(UUID courseId, LocalDate attendanceDate);
    List<AttendanceRecord> findByStudentId(UUID studentId);
}
