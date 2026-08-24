package com.aiclass.api.repository;

import com.aiclass.api.model.InfirmaryVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface InfirmaryRepository extends JpaRepository<InfirmaryVisit, UUID> {
}
