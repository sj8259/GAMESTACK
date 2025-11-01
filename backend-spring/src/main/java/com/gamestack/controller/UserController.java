package com.gamestack.controller;

import com.gamestack.entity.User;
import com.gamestack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            // Build stats
            Map<String, Object> stats = new HashMap<>();
            stats.put("currentLevel", user.getProgress().getCurrentLevel());
            stats.put("totalScore", user.getProgress().getTotalScore());
            stats.put("totalLessonsCompleted", user.getProgress().getCompletedLessons().size());
            
            // Calculate completion rate (assuming 10 lessons per level)
            int totalLessons = user.getProgress().getCurrentLevel() * 10;
            int completed = user.getProgress().getCompletedLessons().size();
            double completionRate = totalLessons > 0 ? (completed * 100.0 / totalLessons) : 0;
            stats.put("completionRate", Math.round(completionRate));
            
            // Level stats
            Map<String, Integer> levelStats = new HashMap<>();
            user.getProgress().getCompletedLessons().forEach(completedLesson -> {
                if (completedLesson.getLesson() != null) {
                    Integer level = completedLesson.getLesson().getLevel();
                    levelStats.put(level.toString(), levelStats.getOrDefault(level.toString(), 0) + 1);
                }
            });
            stats.put("levelStats", levelStats);
            
            // Build progress with completed lessons
            Map<String, Object> progress = new HashMap<>();
            progress.put("completedLessons", user.getProgress().getCompletedLessons());
            
            // Build full user response
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("username", user.getUsername());
            userResponse.put("email", user.getEmail());
            userResponse.put("avatar", user.getAvatar());
            userResponse.put("createdAt", user.getCreatedAt());
            userResponse.put("stats", stats);
            userResponse.put("progress", progress);
            userResponse.put("achievements", user.getAchievements());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", userResponse);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching profile");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/progress")
    public ResponseEntity<?> getProgress() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            // Build lessons with progress
            List<Map<String, Object>> lessons = new ArrayList<>();
            user.getProgress().getCompletedLessons().forEach(completedLesson -> {
                if (completedLesson.getLesson() != null) {
                    Map<String, Object> lessonData = new HashMap<>();
                    lessonData.put("_id", completedLesson.getLesson().getId());
                    lessonData.put("title", completedLesson.getLesson().getTitle());
                    lessonData.put("level", completedLesson.getLesson().getLevel());
                    
                    Map<String, Object> progressData = new HashMap<>();
                    progressData.put("completed", true);
                    progressData.put("score", completedLesson.getScore());
                    progressData.put("attempts", completedLesson.getAttempts());
                    progressData.put("completedAt", completedLesson.getCompletedAt());
                    
                    lessonData.put("progress", progressData);
                    lessons.add(lessonData);
                }
            });
            
            Map<String, Object> response = new HashMap<>();
            response.put("lessons", lessons);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching progress");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/achievements")
    public ResponseEntity<?> getAchievements() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("achievements", user.getAchievements());
            response.put("count", user.getAchievements().size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching achievements");
            return ResponseEntity.status(500).body(error);
        }
    }
}

