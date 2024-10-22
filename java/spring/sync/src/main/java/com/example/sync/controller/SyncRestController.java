package com.example.sync.controller;

import com.example.sync.service.SyncService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/sync", headers = {"Accept=application/json"})
public class SyncRestController {

    private final SyncService syncService;

    public SyncRestController(SyncService syncService) {
        this.syncService = syncService;
    }

    @GetMapping(value = "/shops")
    public ResponseEntity<List<Long>> search() {
        return ResponseEntity.ok(syncService.syncShops());
    }
}
