package com.aiclass.api.repository;

import com.aiclass.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByDocumentNumber(String documentNumber);
    List<User> findByRole(String role);
    List<User> findBySchoolId(Long schoolId);
}
