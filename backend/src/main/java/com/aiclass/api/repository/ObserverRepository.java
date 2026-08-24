package com.aiclass.api.repository;

import com.aiclass.api.model.ObserverRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ObserverRepository extends JpaRepository<ObserverRecord, UUID> {
    List<ObserverRecord> findByStudentId(UUID studentId);
}
