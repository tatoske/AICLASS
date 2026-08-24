package com.aiclass.api.repository;

import com.aiclass.api.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByLocationId(Long locationId);
    List<InventoryItem> findByResponsibleId(Long responsibleId);
    List<InventoryItem> findByStatus(String status);
}
