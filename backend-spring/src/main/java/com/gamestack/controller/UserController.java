package com.gamestack.controller;

import com.gamestack.entity.User;
import com.gamestack.service.UserService;
import com.gamestack.service.LessonService;
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
    
    @Autowired
    private LessonService lessonService;
    
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
            
            // Level stats - need to fetch lessons to get level info
            Map<String, Integer> levelStats = new HashMap<>();
            user.getProgress().getCompletedLessons().forEach(completedLesson -> {
                try {
                    var lesson = lessonService.findById(completedLesson.getLessonId());
                    if (lesson != null) {
                        Integer level = lesson.getLevel();
                        levelStats.put(level.toString(), levelStats.getOrDefault(level.toString(), 0) + 1);
                    }
                } catch (Exception e) {
                    // Skip if lesson not found
                }
            });
            stats.put("levelStats", levelStats);
            
            // Build progress with completed lessons (simplified)
            Map<String, Object> progress = new HashMap<>();
            List<Map<String, Object>> completedLessonsData = new ArrayList<>();
            user.getProgress().getCompletedLessons().forEach(completedLesson -> {
                Map<String, Object> lessonData = new HashMap<>();
                lessonData.put("lessonId", completedLesson.getLessonId());
                lessonData.put("score", completedLesson.getScore());
                lessonData.put("completedAt", completedLesson.getCompletedAt());
                completedLessonsData.add(lessonData);
            });
            progress.put("completedLessons", completedLessonsData);
            
            // Build full user response
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("username", user.getUsername());
            userResponse.put("email", user.getEmail());
            userResponse.put("avatar", user.getAvatar());
            userResponse.put("customAvatar", user.getCustomAvatar());
            userResponse.put("createdAt", user.getCreatedAt());
            userResponse.put("stats", stats);
            userResponse.put("progress", progress);
            userResponse.put("achievements", user.getAchievements());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", userResponse);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching profile: " + e.getMessage());
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
                try {
                    var lesson = lessonService.findById(completedLesson.getLessonId());
                    if (lesson != null) {
                        Map<String, Object> lessonData = new HashMap<>();
                        lessonData.put("_id", lesson.getId());
                        lessonData.put("title", lesson.getTitle());
                        lessonData.put("level", lesson.getLevel());
                        
                        Map<String, Object> progressData = new HashMap<>();
                        progressData.put("completed", true);
                        progressData.put("score", completedLesson.getScore());
                        progressData.put("completedAt", completedLesson.getCompletedAt());
                        
                        lessonData.put("progress", progressData);
                        lessons.add(lessonData);
                    }
                } catch (Exception e) {
                    // Skip if lesson not found
                }
            });
            
            Map<String, Object> response = new HashMap<>();
            response.put("lessons", lessons);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching progress: " + e.getMessage());
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

