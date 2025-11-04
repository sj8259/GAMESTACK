package com.gamestack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class IndexController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "GameStack Backend API");
        response.put("status", "running");
        response.put("version", "1.0.0");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("health", "/api/health");
        endpoints.put("auth", "/api/auth");
        endpoints.put("lessons", "/api/lessons");
        endpoints.put("users", "/api/users");
        
        response.put("endpoints", endpoints);
        return ResponseEntity.ok(response);
    }
}

