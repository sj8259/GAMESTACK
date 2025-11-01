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
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class LeaderboardController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getLeaderboard(@RequestParam(required = false) Integer minScore) {
        try {
            List<User> users;
            
            if (minScore != null) {
                users = userService.getLeaderboardByMinScore(minScore);
            } else {
                users = userService.getLeaderboard();
            }
            
            // Transform to frontend format
            List<Map<String, Object>> leaderboard = new ArrayList<>();
            for (int i = 0; i < users.size(); i++) {
                User user = users.get(i);
                Map<String, Object> userData = new HashMap<>();
                userData.put("_id", user.getId());
                userData.put("rank", i + 1);
                userData.put("username", user.getUsername());
                userData.put("totalScore", user.getProgress().getTotalScore());
                userData.put("completedLessons", user.getProgress().getCompletedLessons().size());
                userData.put("achievements", user.getAchievements());
                userData.put("lastActive", user.getUpdatedAt());
                leaderboard.add(userData);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("leaderboard", leaderboard);
            response.put("count", leaderboard.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching leaderboard");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    @GetMapping("/my-position")
    public ResponseEntity<?> getMyPosition() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User currentUser = userService.findByUsername(username);
            
            List<User> leaderboard = userService.getLeaderboard();
            
            int position = -1;
            for (int i = 0; i < leaderboard.size(); i++) {
                if (leaderboard.get(i).getId().equals(currentUser.getId())) {
                    position = i + 1; // Position is 1-based
                    break;
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("rank", position);
            response.put("username", currentUser.getUsername());
            response.put("totalScore", currentUser.getProgress().getTotalScore());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching your position");
            return ResponseEntity.status(500).body(error);
        }
    }
}



