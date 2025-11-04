package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class UserProgress {
    
    @Field("completedLessons")
    private List<CompletedLesson> completedLessons = new ArrayList<>();
    
    @Field("currentLevel")
    private Integer currentLevel = 1;
    
    @Field("totalScore")
    private Integer totalScore = 0;
    
    // Constructors
    public UserProgress() {}
    
    // Getters and Setters
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





