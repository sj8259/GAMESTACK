package com.gamestack.controller;

import com.gamestack.entity.Lesson;
import com.gamestack.entity.User;
import com.gamestack.service.LessonService;
import com.gamestack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private LessonService lessonService;
    
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getStats() {
        try {
            List<User> allUsers = userService.findAll();
            List<Lesson> allLessons = lessonService.findAll();
            
            long totalUsers = allUsers.size();
            long totalLessons = allLessons.size();
            long publishedLessons = allLessons.stream().filter(Lesson::getIsPublished).count();
            
            // Calculate total completed lessons across all users
            long totalCompletedLessons = allUsers.stream()
                .mapToLong(user -> user.getProgress() != null ? user.getProgress().getCompletedLessons().size() : 0)
                .sum();
            
            // Calculate total score across all users
            int totalScore = allUsers.stream()
                .mapToInt(user -> user.getProgress() != null ? user.getProgress().getTotalScore() : 0)
                .sum();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalUsers", totalUsers);
            stats.put("totalLessons", totalLessons);
            stats.put("publishedLessons", publishedLessons);
            stats.put("draftLessons", totalLessons - publishedLessons);
            stats.put("totalCompletedLessons", totalCompletedLessons);
            stats.put("totalScore", totalScore);
            
            Map<String, Object> response = new HashMap<>();
            response.put("stats", stats);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to fetch stats: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsers() {
        try {
            List<User> users = userService.findAll();
            
            // Convert to safe response format (exclude passwords)
            List<Map<String, Object>> userList = users.stream()
                .map(user -> {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("username", user.getUsername());
                    userMap.put("email", user.getEmail());
                    userMap.put("avatar", user.getAvatar());
                    userMap.put("isAdmin", user.getIsAdmin());
                    userMap.put("createdAt", user.getCreatedAt());
                    
                    // Progress stats
                    if (user.getProgress() != null) {
                        Map<String, Object> progressMap = new HashMap<>();
                        progressMap.put("currentLevel", user.getProgress().getCurrentLevel());
                        progressMap.put("totalScore", user.getProgress().getTotalScore());
                        progressMap.put("completedLessonsCount", user.getProgress().getCompletedLessons().size());
                        userMap.put("progress", progressMap);
                    }
                    
                    userMap.put("achievements", user.getAchievements());
                    return userMap;
                })
                .toList();
            
            Map<String, Object> response = new HashMap<>();
            response.put("users", userList);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to fetch users: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/lessons")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getLessons() {
        try {
            List<Lesson> lessons = lessonService.findAll();
            
            Map<String, Object> response = new HashMap<>();
            response.put("lessons", lessons);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to fetch lessons: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}

