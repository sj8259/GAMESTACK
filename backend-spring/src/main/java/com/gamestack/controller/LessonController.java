package com.gamestack.controller;

import com.gamestack.entity.Lesson;
import com.gamestack.entity.User;
import com.gamestack.entity.CompletedLesson;
import com.gamestack.service.LessonService;
import com.gamestack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class LessonController {
    
    @Autowired
    private LessonService lessonService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getAllLessons(
            @RequestParam(required = false) Integer level,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String concept) {
        
        try {
            List<Lesson> lessons;
            
            if (level != null && difficulty != null) {
                lessons = lessonService.getLessonsByLevelAndDifficulty(level, difficulty);
            } else if (level != null) {
                lessons = lessonService.getLessonsByLevel(level);
            } else if (difficulty != null) {
                lessons = lessonService.getLessonsByDifficulty(difficulty);
            } else if (concept != null) {
                lessons = lessonService.getLessonsByConcept(concept);
            } else {
                lessons = lessonService.getAllPublishedLessons();
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("lessons", lessons);
            response.put("count", lessons.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching lessons");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getLesson(@PathVariable String id) {
        try {
            Lesson lesson = lessonService.findById(id);
            
            if (lesson == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Lesson not found");
                return ResponseEntity.status(404).body(error);
            }
            
            if (!lesson.getIsPublished()) {
                // Check if user is admin
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication != null && authentication.isAuthenticated()) {
                    String username = authentication.getName();
                    User user = userService.findByUsername(username);
                    if (user == null || !user.getIsAdmin()) {
                        Map<String, String> error = new HashMap<>();
                        error.put("message", "Lesson not found");
                        return ResponseEntity.status(404).body(error);
                    }
                } else {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Lesson not found");
                    return ResponseEntity.status(404).body(error);
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("lesson", lesson);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Lesson not found");
            return ResponseEntity.status(404).body(error);
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createLesson(@Valid @RequestBody Lesson lesson) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (user == null || !user.getIsAdmin()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Access denied. Admin privileges required.");
                return ResponseEntity.status(403).body(error);
            }
            
            lesson.setCreatedBy(user.getId());
            lesson = lessonService.createLesson(lesson);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Lesson created successfully");
            response.put("lesson", lesson);
            
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating lesson: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable String id, @Valid @RequestBody Lesson lesson) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (user == null || !user.getIsAdmin()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Access denied. Admin privileges required.");
                return ResponseEntity.status(403).body(error);
            }
            
            lesson.setId(id);
            lesson = lessonService.updateLesson(lesson);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Lesson updated successfully");
            response.put("lesson", lesson);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating lesson");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (user == null || !user.getIsAdmin()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Access denied. Admin privileges required.");
                return ResponseEntity.status(403).body(error);
            }
            
            lessonService.deleteLesson(id);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Lesson deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error deleting lesson");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @PostMapping("/{id}/complete")
    public ResponseEntity<?> completeLesson(@PathVariable String id, @RequestBody Map<String, Object> request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "User not found");
                return ResponseEntity.status(404).body(error);
            }
            
            Lesson lesson = lessonService.findById(id);
            if (lesson == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Lesson not found");
                return ResponseEntity.status(404).body(error);
            }
            
            // Get score from request (default to 100 if not provided)
            Integer score = request.containsKey("score") ? (Integer) request.get("score") : 100;
            
            // Check if lesson already completed
            boolean alreadyCompleted = user.hasCompletedLesson(id);
            
            CompletedLesson completedLesson;
            if (alreadyCompleted) {
                // Update existing completion - find and update
                Optional<CompletedLesson> existing = user.getProgress().getCompletedLessons().stream()
                    .filter(cl -> cl.getLessonId().equals(id))
                    .findFirst();
                
                if (existing.isPresent()) {
                    completedLesson = existing.get();
                    completedLesson.setScore(Math.max(score, completedLesson.getScore())); // Keep highest score
                } else {
                    completedLesson = new CompletedLesson(id, score);
                    user.getProgress().getCompletedLessons().add(completedLesson);
                }
            } else {
                // Create new completion
                completedLesson = new CompletedLesson(id, score);
                user.getProgress().getCompletedLessons().add(completedLesson);
                user.getProgress().setTotalScore(user.getProgress().getTotalScore() + score);
                user.getProgress().setCurrentLevel(Math.floorDiv(user.getProgress().getCompletedLessons().size(), 5) + 1);
                
                // Award achievements
                List<String> achievements = user.getAchievements();
                if (!achievements.contains("first_lesson")) {
                    achievements.add("first_lesson");
                }
                if (user.getProgress().getCompletedLessons().size() >= 5 && 
                    !achievements.contains("persistent")) {
                    achievements.add("persistent");
                }
                if (user.getProgress().getCompletedLessons().size() >= 10 && 
                    !achievements.contains("explorer")) {
                    achievements.add("explorer");
                }
                if (score == 100 && !achievements.contains("perfect_score")) {
                    achievements.add("perfect_score");
                }
            }
            
            userService.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Lesson completed successfully");
            response.put("completedLesson", completedLesson);
            response.put("achievements", user.getAchievements());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error completing lesson: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/{id}/progress")
    public ResponseEntity<?> getLessonProgress(@PathVariable String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "User not found");
                return ResponseEntity.status(404).body(error);
            }
            
            Lesson lesson = lessonService.findById(id);
            if (lesson == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Lesson not found");
                return ResponseEntity.status(404).body(error);
            }
            
            Optional<CompletedLesson> completedLesson = user.getProgress().getCompletedLessons().stream()
                .filter(cl -> cl.getLessonId().equals(id))
                .findFirst();
            
            Map<String, Object> response = new HashMap<>();
            response.put("completed", completedLesson.isPresent());
            
            if (completedLesson.isPresent()) {
                Map<String, Object> completionData = new HashMap<>();
                completionData.put("score", completedLesson.get().getScore());
                completionData.put("completedAt", completedLesson.get().getCompletedAt());
                response.put("completion", completionData);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching lesson progress");
            return ResponseEntity.status(500).body(error);
        }
    }
}

