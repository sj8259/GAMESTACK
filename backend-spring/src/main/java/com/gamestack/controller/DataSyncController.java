package com.gamestack.controller;

import com.gamestack.service.DataSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for data synchronization operations
 * Allows manual triggering of data sync from MongoDB
 */
@RestController
@RequestMapping("/api/sync")
public class DataSyncController {

    @Autowired
    private DataSyncService dataSyncService;

    /**
     * Trigger full data synchronization
     * Admin only endpoint
     */
    @PostMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> syncAll() {
        try {
            dataSyncService.syncAll();
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Data synchronization completed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Failed to sync data: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Get synchronization statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<DataSyncService.SyncStatistics> getStatistics() {
        DataSyncService.SyncStatistics stats = dataSyncService.getSyncStatistics();
        return ResponseEntity.ok(stats);
    }
}

