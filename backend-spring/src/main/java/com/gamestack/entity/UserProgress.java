package com.gamestack.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_progress")
public class UserProgress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToMany(mappedBy = "userProgress", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CompletedLesson> completedLessons = new ArrayList<>();
    
    @Column(name = "current_level", nullable = false)
    private Integer currentLevel = 1;
    
    @Column(name = "total_score", nullable = false)
    private Integer totalScore = 0;
    
    // Constructors
    public UserProgress() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public List<CompletedLesson> getCompletedLessons() {
        return completedLessons;
    }
    
    public void setCompletedLessons(List<CompletedLesson> completedLessons) {
        this.completedLessons = completedLessons;
    }
    
    public Integer getCurrentLevel() {
        return currentLevel;
    }
    
    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }
    
    public Integer getTotalScore() {
        return totalScore;
    }
    
    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }
}



