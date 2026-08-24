package com.aiclass.api.repository;

import com.aiclass.api.model.Admission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface AdmissionRepository extends JpaRepository<Admission, UUID> {
}
