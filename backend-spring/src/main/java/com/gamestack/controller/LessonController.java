package com.gamestack.controller;

import com.gamestack.entity.Lesson;
import com.gamestack.entity.Difficulty;
import com.gamestack.entity.Concept;
import com.gamestack.entity.User;
import com.gamestack.entity.CompletedLesson;
import com.gamestack.entity.Achievement;
import com.gamestack.repository.CompletedLessonRepository;
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
    
    @Autowired
    private CompletedLessonRepository completedLessonRepository;
    
    @GetMapping
    public ResponseEntity<?> getAllLessons(
            @RequestParam(required = false) Integer level,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String concept) {
        
        try {
            List<Lesson> lessons;
            
            if (level != null && difficulty != null) {
                lessons = lessonService.getLessonsByLevelAndDifficulty(level, Difficulty.valueOf(difficulty.toUpperCase()));
            } else if (level != null) {
                lessons = lessonService.getLessonsByLevel(level);
            } else if (difficulty != null) {
                lessons = lessonService.getLessonsByDifficulty(Difficulty.valueOf(difficulty.toUpperCase()));
            } else if (concept != null) {
                lessons = lessonService.getLessonsByConcept(Concept.valueOf(concept.toUpperCase()));
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
    public ResponseEntity<?> getLesson(@PathVariable Long id) {
        try {
            Lesson lesson = lessonService.findById(id);
            
            if (!lesson.getIsPublished()) {
                // Check if user is admin
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication != null && authentication.isAuthenticated()) {
                    String username = authentication.getName();
                    User user = userService.findByUsername(username);
                    if (!user.getIsAdmin()) {
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
            
            if (!user.getIsAdmin()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Access denied. Admin privileges required.");
                return ResponseEntity.status(403).body(error);
            }
            
            lesson = lessonService.createLesson(lesson, user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Lesson created successfully");
            response.put("lesson", lesson);
            
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating lesson");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable Long id, @Valid @RequestBody Lesson lesson) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (!user.getIsAdmin()) {
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
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (!user.getIsAdmin()) {
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
    public ResponseEntity<?> completeLesson(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            Lesson lesson = lessonService.findById(id);
            
            // Get score from request (default to 100 if not provided)
            Integer score = request.containsKey("score") ? (Integer) request.get("score") : 100;
            Integer attempts = request.containsKey("attempts") ? (Integer) request.get("attempts") : 1;
            
            // Check if lesson already completed
            Optional<CompletedLesson> existingCompletion = 
                completedLessonRepository.findByUserProgressAndLesson(user.getProgress(), lesson);
            
            CompletedLesson completedLesson;
            if (existingCompletion.isPresent()) {
                // Update existing completion
                completedLesson = existingCompletion.get();
                completedLesson.setScore(Math.max(score, completedLesson.getScore())); // Keep highest score
                completedLesson.setAttempts(completedLesson.getAttempts() + attempts);
                completedLesson = completedLessonRepository.save(completedLesson);
            } else {
                // Create new completion
                completedLesson = new CompletedLesson(lesson, user.getProgress(), score);
                completedLesson.setAttempts(attempts);
                completedLesson = completedLessonRepository.save(completedLesson);
                
                // Update user progress
                user.getProgress().getCompletedLessons().add(completedLesson);
                user.getProgress().setTotalScore(user.getProgress().getTotalScore() + score);
                user.getProgress().setCurrentLevel(Math.floorDiv(user.getProgress().getCompletedLessons().size(), 5) + 1);
                
                // Award achievements
                if (!user.getAchievements().contains(Achievement.FIRST_LESSON)) {
                    user.getAchievements().add(Achievement.FIRST_LESSON);
                }
                if (user.getProgress().getCompletedLessons().size() >= 5 && 
                    !user.getAchievements().contains(Achievement.PERSISTENT)) {
                    user.getAchievements().add(Achievement.PERSISTENT);
                }
                if (user.getProgress().getCompletedLessons().size() >= 10 && 
                    !user.getAchievements().contains(Achievement.EXPLORER)) {
                    user.getAchievements().add(Achievement.EXPLORER);
                }
                if (score == 100 && !user.getAchievements().contains(Achievement.PERFECT_SCORE)) {
                    user.getAchievements().add(Achievement.PERFECT_SCORE);
                }
                
                userService.save(user);
            }
            
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
    public ResponseEntity<?> getLessonProgress(@PathVariable Long id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            Lesson lesson = lessonService.findById(id);
            
            Optional<CompletedLesson> completedLesson = 
                completedLessonRepository.findByUserProgressAndLesson(user.getProgress(), lesson);
            
            Map<String, Object> response = new HashMap<>();
            response.put("completed", completedLesson.isPresent());
            
            if (completedLesson.isPresent()) {
                Map<String, Object> completionData = new HashMap<>();
                completionData.put("score", completedLesson.get().getScore());
                completionData.put("attempts", completedLesson.get().getAttempts());
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

