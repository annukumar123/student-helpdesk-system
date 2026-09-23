package com.studenthelpdesk.controller;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public Map<String, Object> healthCheck() {

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put("status", "UP");
        response.put("message", "Student Helpdesk Backend is running");
        response.put("timestamp", LocalDateTime.now());

        return response;
    }
}