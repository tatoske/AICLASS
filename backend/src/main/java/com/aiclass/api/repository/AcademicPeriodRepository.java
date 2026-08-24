package com.aiclass.api.repository;

import com.aiclass.api.model.AcademicPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademicPeriodRepository extends JpaRepository<AcademicPeriod, Long> {
    Optional<AcademicPeriod> findByActiveTrue();
}
