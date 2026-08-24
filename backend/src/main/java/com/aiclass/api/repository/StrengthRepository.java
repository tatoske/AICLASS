package com.aiclass.api.repository;

import com.aiclass.api.model.StrengthEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StrengthRepository extends JpaRepository<StrengthEvaluation, UUID> {
    Optional<StrengthEvaluation> findByStudentId(UUID studentId);
}
