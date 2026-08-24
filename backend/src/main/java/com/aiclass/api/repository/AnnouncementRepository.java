package com.aiclass.api.repository;

import com.aiclass.api.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, UUID> {
    List<Announcement> findAllByOrderByPublishedDateDesc();
}
