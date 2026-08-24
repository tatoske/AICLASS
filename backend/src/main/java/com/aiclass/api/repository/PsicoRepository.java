package com.aiclass.api.repository;

import com.aiclass.api.model.PsicoSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface PsicoRepository extends JpaRepository<PsicoSession, UUID> {
    List<PsicoSession> findByStudentId(UUID studentId);
}
