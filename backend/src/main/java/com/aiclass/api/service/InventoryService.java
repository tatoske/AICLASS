package com.aiclass.api.service;

import com.aiclass.api.model.InventoryItem;
import com.aiclass.api.model.Location;
import com.aiclass.api.repository.InventoryItemRepository;
import com.aiclass.api.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InventoryService {

    private final InventoryItemRepository inventoryRepository;
    private final LocationRepository locationRepository;

    @Autowired
    public InventoryService(InventoryItemRepository inventoryRepository, LocationRepository locationRepository) {
        this.inventoryRepository = inventoryRepository;
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public InventoryItem createItem(InventoryItem item) {
        if (item.getEntryDate() == null) {
            item.setEntryDate(LocalDate.now());
        }
        return inventoryRepository.save(item);
    }

    public void decommissionItem(Long id) {
        inventoryRepository.findById(id).ifPresent(item -> {
            item.setStatus("DE_BAJA");
            item.setDecommissionDate(LocalDate.now());
            inventoryRepository.save(item);
        });
    }
}
